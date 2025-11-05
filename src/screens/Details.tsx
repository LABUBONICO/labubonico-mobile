import {
  FlatList,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { useContext, useEffect, useState } from "react";
import { extractImageDataToJson } from "../utils/analyzeImage";
import { JSONResponse } from "../types";

import ActionButtons from "../components/Details/ActionButtons";
import LoadingError from "../components/Details/LoadingError";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { Text } from "react-native-paper";
import { paperTheme } from "../theme/theme";
import { Entypo } from "@expo/vector-icons";
import { formatPrice } from "../utils";

const Details = ({
  route,
  navigation,
}: NativeStackScreenProps<MainStackParamList, "Details">) => {
  const { photo } = route.params;
  const [response, setResponse] = useState<JSONResponse | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { categories } = useContext(CategoriesContext);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        console.log("Extracting data from photo...");
        const response = await extractImageDataToJson(
          photo?.base64 || "",
          categories
        );
        setResponse({
          ...response,
          timestamp: new Date(String(response.timestamp)),
        });
      } catch (error) {
        console.error("Error extracting image data:", error);
      }
    };
    loadDetails();
  }, [photo]);

  const getCategorieColor = (name: string) => {
    const category = categories.find(
      (categorie) => categorie.name.toUpperCase() === name.toUpperCase()
    );
    return category ? category.color : "#000000";
  };

  return (
    <View style={styles.container}>
      {!response || response?.errorMessage ? (
        <LoadingError response={response} />
      ) : (
        <View
          style={{
            flex: 1,
            width: "100%",
            gap: paperTheme.spacing.xl,
            alignItems: "center",
          }}
        >
          <View
            style={{
              gap: paperTheme.spacing.md,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              variant="headlineSmall"
              style={{
                color: getCategorieColor(response.category),
              }}
            >
              {response.category}
            </Text>
            <TextInput
              style={[styles.input, sheetStyles.categoryInput]}
              value={response.local}
              placeholder="Local da compra"
              multiline
              numberOfLines={4}
              onChangeText={(text) => setResponse({ ...response, local: text })}
            />
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={{
                padding: paperTheme.spacing.md,
                borderRadius: paperTheme.borderRadius.sm,
                flexDirection: "row",
                alignItems: "center",
                gap: paperTheme.spacing.sm,
              }}
            >
              <Entypo name="calendar" size={16} color="black" />
              <Text variant="titleLarge">
                {response.timestamp?.toLocaleDateString() || "Selecionar data"}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={response.timestamp || new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, date?: Date) => {
                  if (Platform.OS === "android") {
                    setShowDatePicker(false);
                  }
                  if (date) {
                    setResponse({ ...response, timestamp: date });
                  }
                }}
              />
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text variant="headlineSmall">Total</Text>
            <Text variant="headlineSmall">
              R$ {formatPrice(response.price)}
            </Text>
          </View>
          <FlatList
            data={response.items}
            contentContainerStyle={{ gap: paperTheme.spacing.md }}
            style={{ flexGrow: 0, width: "100%" }}
            renderItem={({ item, index }) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  gap: paperTheme.spacing.sm,
                  width: "100%",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Text variant="bodyLarge" style={{ opacity: 0.5 }}>
                  {item.name}
                </Text>
                <Text variant="bodyLarge" style={{ opacity: 0.5 }}>
                  x{item.quantity}
                </Text>
                <View
                  style={{
                    height: 1,
                    flex: 1,
                    width: "100%",
                    backgroundColor: paperTheme.colors.text,
                    opacity: 0.2,
                  }}
                />
                <Text variant="bodyLarge" style={{ opacity: 0.5 }}>
                  R$ {formatPrice(item.price)}
                </Text>
              </View>
            )}
          />
        </View>
      )}
      <ActionButtons response={response} navigation={navigation} />
    </View>
  );
};

const sheetStyles = StyleSheet.create({
  categoryInput: {
    width: "100%",
    textAlign: "center",
    fontFamily: "SwitzerBold",
    fontSize: 32,
    padding: 0,
    textAlignVertical: "center",
  },
});

export default Details;
