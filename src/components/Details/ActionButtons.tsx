import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { JSONResponse } from "../../types";
import { MainStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as firestore from "firebase/firestore";
import { recipties } from "../../api/firestore";
import styles from "../../styles";

type ActionButtonsProps = {
  response: JSONResponse | undefined;
  navigation: NativeStackScreenProps<
    MainStackParamList,
    "Details"
  >["navigation"];
};
const ActionButtons = ({ response, navigation }: ActionButtonsProps) => {
  const [isLoading, setIsLoading] = useState(false);

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
  return (
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
  );
};

export default ActionButtons;
