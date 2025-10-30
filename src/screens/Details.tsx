import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { useEffect, useState } from "react";
import { extractImageDataToJson } from "../utils/analyzeImage";
import { JSONResponse } from "../types";
import * as firestore from "firebase/firestore";
import { recipties } from "../api/firestore";

const Details = ({
  route,
  navigation,
}: NativeStackScreenProps<MainStackParamList, "Details">) => {
  const { photo } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<JSONResponse | undefined>(undefined);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        console.log("Extracting data from photo...");
        const response = await extractImageDataToJson(photo?.base64 || "");
        setResponse(response);
      } catch (error) {
        console.error("Error extracting image data:", error);
      }
    };
    loadDetails();
  }, [photo]);

  const saveDetails = async () => {
    try {
      setIsLoading(true);
      await firestore.addDoc(recipties, response);
      navigation.popToTop();
    } catch (error) {
      console.error("Error saving document:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!photo) {
    return (
      <View style={styles.container}>
        <Text>No photo available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!response || response?.extractable == 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={require("../../assets/images/labubonico_logo.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text>
            {response ? response.errorMessage : "labubonico está pensando..."}
          </Text>
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={{ uri: photo.uri }}
            style={{ width: "100%", height: "50%" }}
            resizeMode="contain"
          />
          <Text>{JSON.stringify(response, null, 2)}</Text>
        </View>
      )}
      <View
        style={{
          position: "absolute",
          bottom: 50,
          left: 20,
          right: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={styles.buttonIcon}
          onPress={() => navigation.popToTop()}
        >
          <Text>Descartar</Text>
        </TouchableOpacity>
        {response &&
          (response?.extractable == 0 ? (
            <TouchableOpacity
              style={styles.buttonIcon}
              onPress={() => navigation.goBack()}
            >
              <Text>Tentar Novamente</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.buttonIcon} onPress={saveDetails}>
              {isLoading ? (
                <ActivityIndicator color="white" size={"small"} />
              ) : (
                <Text>Ok</Text>
              )}
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

export default Details;
