import React, { useState, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { JSONResponse } from "../../types";
import { Category } from "../../contexts/CategoriesContext";
import { paperTheme } from "../../theme/theme";
import { Button, Text } from "react-native-paper";
import { formatPrice } from "../../utils";

interface StackedBarChartProps {
  receipts?: JSONResponse[];
  categories?: Category[];
}

interface ChartDataItem {
  label: string;
  total: number;
  [key: string]: number | string;
}

type ViewMode = "days" | "weeks" | "months";

const MONTH_NAMES = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];
const DAY_NAMES = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

const parseDate = (ts: any): Date | null => {
  try {
    if (ts instanceof Date) return ts;
    if (typeof ts === "number") return new Date(ts);
    if (ts?.toDate) return ts.toDate();
    if (ts?.seconds) return new Date(ts.seconds * 1000);
    return new Date(ts);
  } catch {
    return null;
  }
};

const getDateKey = (date: Date): string => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
};

const getWeekOfMonth = (date: Date): number => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const week = Math.ceil((date.getDate() + firstDay.getDay()) / 7);
  return Math.min(week, 4);
};

const getWeekKey = (date: Date): string =>
  `${date.getFullYear()}-${date.getMonth()}-W${getWeekOfMonth(date)}`;

const StackedBarChartScreen: React.FC<StackedBarChartProps> = ({
  receipts = [],
  categories = [],
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>("weeks");

  const getCurrentWeekDates = (): Date[] => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - today.getDay() + i);
      return date;
    });
  };

  const findCategory = (name: string) =>
    categories.find((cat) => cat.name.toUpperCase() === name.toUpperCase());

  const buildChartData = (
    keys: string[],
    processor: (data: any, receipt: JSONResponse) => string | null
  ) => {
    const data: any = {};
    keys.forEach((key) => {
      data[key] = {};
      categories.forEach((cat) => (data[key][cat.name] = 0));
    });

    receipts.forEach((receipt) => {
      const receiptDate = parseDate(receipt.timestamp);
      if (!receiptDate || isNaN(receiptDate.getTime()) || !receipt.category)
        return;

      const key = processor(data, receipt);
      if (!key || !data[key]) return;

      const category = findCategory(receipt.category.trim());
      if (category) data[key][category.name] += receipt.price;
    });

    return data;
  };

  const getTotalFromData = (item: any): number =>
    Object.values(item)
      .filter((v) => typeof v === "number")
      .reduce((a: any, b: any) => a + b, 0);

  const data: ChartDataItem[] = useMemo(() => {
    if (viewMode === "days") {
      const weekDates = getCurrentWeekDates();
      const daysData = buildChartData(
        weekDates.map(getDateKey),
        (data, receipt) => {
          const receiptDate = parseDate(receipt.timestamp);
          if (!receiptDate) return null;
          const key = getDateKey(receiptDate);
          return weekDates.some((d) => getDateKey(d) === key) ? key : null;
        }
      );

      return weekDates.map((date) => {
        const key = getDateKey(date);
        return {
          label: DAY_NAMES[date.getDay()],
          total: getTotalFromData(daysData[key] || {}),
          ...(daysData[key] || {}),
        };
      });
    }

    if (viewMode === "weeks") {
      const today = new Date();
      const weeks = [1, 2, 3, 4];
      const weeksData = buildChartData(
        weeks.map((w) => `${today.getFullYear()}-${today.getMonth()}-W${w}`),
        (data, receipt) => {
          const receiptDate = parseDate(receipt.timestamp);
          if (!receiptDate) return null;
          if (
            receiptDate.getFullYear() !== today.getFullYear() ||
            receiptDate.getMonth() !== today.getMonth()
          )
            return null;
          return getWeekKey(receiptDate);
        }
      );

      return weeks.map((week) => {
        const key = `${today.getFullYear()}-${today.getMonth()}-W${week}`;
        const weekData = weeksData[key] || {};
        return {
          label: `Semana ${week}`,
          total: getTotalFromData(weekData),
          ...Object.fromEntries(
            Object.entries(weekData).filter(([k]) => k !== "weekNumber")
          ),
        };
      });
    }

    // months view
    const today = new Date();
    const months = Array.from({ length: 12 }, (_, i) => i);
    const monthsData = buildChartData(
      months.map((m) => `${today.getFullYear()}-${m}`),
      (data, receipt) => {
        const receiptDate = parseDate(receipt.timestamp);
        if (!receiptDate || receiptDate.getFullYear() !== today.getFullYear())
          return null;
        return `${today.getFullYear()}-${receiptDate.getMonth()}`;
      }
    );

    return months.map((month) => {
      const key = `${today.getFullYear()}-${month}`;
      return {
        label: MONTH_NAMES[month],
        total: getTotalFromData(monthsData[key] || {}),
        ...(monthsData[key] || {}),
      };
    });
  }, [receipts, categories, viewMode]);

  const max = Math.max(...data.map((d) => d.total as number), 1);

  if (categories.length === 0)
    return (
      <View style={styles.center}>
        <Text>Carregando...</Text>
      </View>
    );

  return (
    <View style={{ flex: 1, gap: paperTheme.spacing.xl }}>
      <View style={styles.container}>
        {data.map((item, idx) => (
          <View key={idx} style={styles.barContainer}>
            <Text variant="bodyMedium">
              {Math.floor((item.total as number) / 100)}
            </Text>
            <View style={styles.stackedBar}>
              {categories.map((cat) => {
                const height = (((item[cat.name] || 0) as number) / max) * 100;
                return height > 0 ? (
                  <View
                    key={cat.name}
                    style={[
                      styles.barSegment,
                      { height: `${height}%`, backgroundColor: cat.color },
                    ]}
                  />
                ) : null;
              })}
            </View>
            <Text variant="bodyMedium">{item.label}</Text>
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          {...paperTheme.buttons.small}
          buttonColor={
            viewMode === "days"
              ? paperTheme.colors.primary
              : paperTheme.colors.surface
          }
          style={{ flex: 1 }}
          onPress={() => setViewMode("days")}
        >
          Dias
        </Button>
        <Button
          {...paperTheme.buttons.small}
          buttonColor={
            viewMode === "weeks"
              ? paperTheme.colors.primary
              : paperTheme.colors.surface
          }
          style={{ flex: 1 }}
          onPress={() => setViewMode("weeks")}
        >
          Semanas
        </Button>
        <Button
          {...paperTheme.buttons.small}
          buttonColor={
            viewMode === "months"
              ? paperTheme.colors.primary
              : paperTheme.colors.surface
          }
          style={{ flex: 1 }}
          onPress={() => setViewMode("months")}
        >
          Meses
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: paperTheme.spacing.sm,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: "#f0f0f0",
  },
  buttonActive: {
    backgroundColor: "#007AFF",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  buttonTextActive: {
    color: "#fff",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 2,
    justifyContent: "space-between",
    marginTop: paperTheme.spacing.xl,
  },
  barContainer: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
    flex: 1,
    gap: 4,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  dayTotal: { fontSize: 12, fontWeight: "500", color: "#666" },
  stackedBar: {
    flexDirection: "column-reverse",
    maxHeight: "100%",

    width: "100%",
    gap: 2,
  },
  barSegment: {
    height: "100%",
    width: "100%",
    borderRadius: 2,
  },
});

export default StackedBarChartScreen;
