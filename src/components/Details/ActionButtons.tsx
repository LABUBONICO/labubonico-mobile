import { useContext, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { JSONResponse } from "../../types";
import { MainStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as firestore from "firebase/firestore";
import { receipties } from "../../api/firestore";
import styles from "../../styles";
import { AuthContext } from "../../contexts/AuthContext";
import { paperTheme } from "../../theme/theme";

type ActionButtonsProps = {
  response: JSONResponse | undefined;
  navigation: NativeStackScreenProps<
    MainStackParamList,
    "Details"
  >["navigation"];
};
const ActionButtons = ({ response, navigation }: ActionButtonsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const saveDetails = async () => {
    try {
      setIsLoading(true);
      await firestore.addDoc(receipties, {
        ...response,
        userId: user?.uid,
        createdAt: new Date(),
      });
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
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Button
        {...paperTheme.buttons.contained}
        buttonColor={paperTheme.colors.surface}
        style={{ flex: 1 }}
        onPress={() => navigation.popToTop()}
      >
        Cancelar
      </Button>
      {response && (
        <Button
          {...paperTheme.buttons.contained}
          buttonColor={paperTheme.colors.success}
          style={{ flex: 1 }}
          loading={isLoading}
          onPress={
            response?.errorMessage ? () => navigation.goBack() : saveDetails
          }
        >
          {response?.errorMessage ? "Refazer" : "Salvar"}
        </Button>
      )}
    </View>
  );
};

export default ActionButtons;
