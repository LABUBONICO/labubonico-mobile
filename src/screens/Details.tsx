import {
  FlatList,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { useEffect, useState } from "react";
import { extractImageDataToJson } from "../utils/analyzeImage";
import { JSONResponse } from "../types";

import ActionButtons from "../components/Details/ActionButtons";
import LoadingError from "../components/Details/LoadingError";
import DateTimePicker from "@react-native-community/datetimepicker";
import DetailsTextInput from "../components/Details/DetailsTextInput";

const Details = ({
  route,
  navigation,
}: NativeStackScreenProps<MainStackParamList, "Details">) => {
  const { photo } = route.params;
  const [response, setResponse] = useState<JSONResponse | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        console.log("Extracting data from photo...");
        const response = await extractImageDataToJson(photo?.base64 || "");
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

  return (
    <View style={styles.container}>
      {!response || response?.errorMessage ? (
        <LoadingError response={response} />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>{response.category}</Text>
          <TextInput
            value={response.local}
            onChangeText={(text) => setResponse({ ...response, local: text })}
          />
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={{
              padding: 10,
              backgroundColor: "#e0e0e0",
              borderRadius: 5,
              marginVertical: 10,
            }}
          >
            <Text>
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
          <View style={{ flexDirection: "row" }}>
            <Text>Total R$ </Text>
            <TextInput
              value={String(response.price)}
              keyboardType="numeric"
              onChangeText={(number) => {
                setResponse({ ...response, price: Number(number) });
              }}
            />
          </View>
          <FlatList
            data={response.items}
            style={{ flexGrow: 0 }}
            renderItem={({ item, index }) => (
              <View key={index} style={{ flexDirection: "row" }}>
                <DetailsTextInput
                  item={item.name}
                  index={index}
                  response={response}
                  setResponse={setResponse}
                />
                <DetailsTextInput
                  item={item.quantity}
                  index={index}
                  response={response}
                  setResponse={setResponse}
                  numeric
                />
                <View style={{ flexDirection: "row" }}>
                  <Text>R$ </Text>
                  <DetailsTextInput
                    item={item.price}
                    index={index}
                    response={response}
                    setResponse={setResponse}
                    numeric
                  />
                </View>
              </View>
            )}
          />
          <TouchableOpacity
            onPress={() => {
              const newItems = [
                ...(response.items || []),
                { name: "", quantity: 1, price: 0 },
              ];
              setResponse({ ...response, items: newItems });
            }}
          >
            <Text>+ Adicionar Item</Text>
          </TouchableOpacity>
        </View>
      )}
      <ActionButtons response={response} navigation={navigation} />
    </View>
  );
};

export default Details;
