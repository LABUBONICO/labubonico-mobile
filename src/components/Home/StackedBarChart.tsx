import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { JSONResponse } from "../../types";
import { Category } from "../../contexts/CategoriesContext";

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

const StackedBarChartScreen: React.FC<StackedBarChartProps> = ({
  receipts = [],
  categories = [],
}) => {
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("weeks");

  const getDayOfWeek = (date: Date) =>
    ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"][date.getDay()];

  const getWeekOfMonth = (date: Date): number => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfWeek = firstDay.getDay();
    const dayOfMonth = date.getDate();
    return Math.ceil((dayOfMonth + firstDayOfWeek) / 7);
  };

  const getMonthName = (date: Date): string => {
    const months = [
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
    return months[date.getMonth()];
  };

  const getCurrentWeekDates = (): Date[] => {
    const today = new Date();
    const currentDay = today.getDay();
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - currentDay + i);
      dates.push(date);
    }
    return dates;
  };

  const getCurrentMonthDates = (): Date[] => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dates = [];
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(new Date(year, month, i));
    }
    return dates;
  };

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

  // Process receipts data grouped by selected view mode and category
  const data: ChartDataItem[] = useMemo(() => {
    if (viewMode === "days") {
      const weekDates = getCurrentWeekDates();
      const daysData: any = {};

      weekDates.forEach((date) => {
        const dayLabel = getDayOfWeek(date);
        daysData[dayLabel] = {};
        categories.forEach((cat) => (daysData[dayLabel][cat.name] = 0));
      });

      receipts.forEach((receipt) => {
        const receiptDate = parseDate(receipt.timestamp);
        if (!receiptDate || isNaN(receiptDate.getTime()) || !receipt.category)
          return;

        const dayLabel = getDayOfWeek(receiptDate);
        const receiptCategory = receipt.category.trim();

        const matchedCategory = categories.find(
          (cat) => cat.name.toUpperCase() === receiptCategory.toUpperCase()
        );

        if (matchedCategory && daysData[dayLabel]) {
          daysData[dayLabel][matchedCategory.name] += receipt.price;
        }
      });

      return getCurrentWeekDates().map((date) => {
        const dayLabel = getDayOfWeek(date);
        return {
          label: dayLabel,
          total: Object.values(daysData[dayLabel] || {}).reduce(
            (a: any, b: any) => a + b,
            0
          ),
          ...daysData[dayLabel],
        };
      });
    } else if (viewMode === "weeks") {
      const weeks = [1, 2, 3, 4];
      const weeksData: any = {};

      weeks.forEach((week) => {
        weeksData[week] = {};
        categories.forEach((cat) => (weeksData[week][cat.name] = 0));
      });

      receipts.forEach((receipt) => {
        const receiptDate = parseDate(receipt.timestamp);
        if (!receiptDate || isNaN(receiptDate.getTime()) || !receipt.category)
          return;

        const weekNumber = getWeekOfMonth(receiptDate);
        const receiptCategory = receipt.category.trim();

        const matchedCategory = categories.find(
          (cat) => cat.name.toUpperCase() === receiptCategory.toUpperCase()
        );

        if (matchedCategory && weeksData[weekNumber]) {
          weeksData[weekNumber][matchedCategory.name] += receipt.price;
        }
      });

      return weeks.map((week) => ({
        label: `Semana ${week}`,
        total: Object.values(weeksData[week]).reduce(
          (a: any, b: any) => a + b,
          0
        ),
        ...weeksData[week],
      }));
    } else {
      // months view
      const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      const monthsData: any = {};

      months.forEach((month) => {
        monthsData[month] = {};
        categories.forEach((cat) => (monthsData[month][cat.name] = 0));
      });

      receipts.forEach((receipt) => {
        const receiptDate = parseDate(receipt.timestamp);
        if (!receiptDate || isNaN(receiptDate.getTime()) || !receipt.category)
          return;

        const monthIndex = receiptDate.getMonth();
        const receiptCategory = receipt.category.trim();

        const matchedCategory = categories.find(
          (cat) => cat.name.toUpperCase() === receiptCategory.toUpperCase()
        );

        if (matchedCategory && monthsData[monthIndex] !== undefined) {
          monthsData[monthIndex][matchedCategory.name] += receipt.price;
        }
      });

      const monthNames = [
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

      return months.map((month) => ({
        label: monthNames[month],
        total: Object.values(monthsData[month]).reduce(
          (a: any, b: any) => a + b,
          0
        ),
        ...monthsData[month],
      }));
    }
  }, [receipts, categories, viewMode]);

  const max = Math.max(...data.map((d) => d.total as number), 1);

  if (categories.length === 0)
    return (
      <View style={styles.center}>
        <Text>Carregando...</Text>
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, viewMode === "days" && styles.buttonActive]}
          onPress={() => setViewMode("days")}
        >
          <Text
            style={[
              styles.buttonText,
              viewMode === "days" && styles.buttonTextActive,
            ]}
          >
            Dias
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, viewMode === "weeks" && styles.buttonActive]}
          onPress={() => setViewMode("weeks")}
        >
          <Text
            style={[
              styles.buttonText,
              viewMode === "weeks" && styles.buttonTextActive,
            ]}
          >
            Semanas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, viewMode === "months" && styles.buttonActive]}
          onPress={() => setViewMode("months")}
        >
          <Text
            style={[
              styles.buttonText,
              viewMode === "months" && styles.buttonTextActive,
            ]}
          >
            Meses
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {data.map((item, idx) => (
          <View key={idx} style={styles.barContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.dayTotal}>
                R$ {(item.total as number).toFixed(2)}
              </Text>
            </View>
            <View
              style={styles.stackedBar}
              onTouchEnd={() =>
                setSelectedEntry(
                  `${item.label}: R$ ${(item.total as number).toFixed(2)}`
                )
              }
            >
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
            <Text style={styles.label}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
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
    padding: 10,
    flexDirection: "row",
    gap: 2,
    justifyContent: "space-between",
  },
  barContainer: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
    flex: 1,
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
    height: "100%",
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
