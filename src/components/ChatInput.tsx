import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import baseStyles from "../styles";
import { useCameraPermissions } from "expo-camera";
import * as FileSystem from "expo-file-system/legacy";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import * as DocumentPicker from "expo-document-picker";
import { paperTheme } from "../theme/theme";

type ChatInputProps = {
  input: string;
  setInput: (text: string) => void;
  navigation: NativeStackScreenProps<MainStackParamList>["navigation"];
  file: DocumentPicker.DocumentPickerResult | null;
  setFile: (file: DocumentPicker.DocumentPickerResult | null) => void;
  handlerSend: () => Promise<void>;
};

const ChatInput = ({
  input,
  setInput,
  navigation,
  file,
  setFile,
  handlerSend,
}: ChatInputProps) => {
  const [permission, requestPermission] = useCameraPermissions();

  const handleOpenCamera = async () => {
    if (permission?.granted) {
      navigation.navigate("Camera");
    } else {
      const granted = await requestPermission();
      if (granted) {
        navigation.navigate("Camera");
      }
    }
  };

  const handlerFilePick = async () => {
    const imagePicked = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
      copyToCacheDirectory: true,
      base64: true,
    });

    // If base64 is not available (mobile), convert file to base64
    if (
      imagePicked.assets &&
      imagePicked.assets[0] &&
      !imagePicked.assets[0].base64
    ) {
      try {
        const base64Data = await FileSystem.readAsStringAsync(
          imagePicked.assets[0].uri,
          { encoding: "base64" }
        );
        imagePicked.assets[0].base64 = base64Data;
      } catch (error) {
        console.error("Error converting file to base64:", error);
      }
    }

    imagePicked.assets && setFile(imagePicked);
  };

  return (
    <View
      onFocus={() => navigation.navigate("Chat")}
      style={{
        width: "100%",
        height: 80,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: paperTheme.colors.surface,
        padding: paperTheme.spacing.md,
        gap: paperTheme.spacing.sm,
        borderRadius: paperTheme.borderRadius.full,
      }}
    >
      <View style={{ flex: 1 }}>
        <TextInput
          autoFocus={true}
          style={baseStyles.input}
          value={input}
          placeholder="Peça ao Labubonico"
          onChangeText={setInput}
        />
      </View>

      <TouchableOpacity
        onPress={file ? () => setFile(null) : handlerFilePick}
        style={styles.buttonIcon}
      >
        {!file ? (
          <Ionicons name="attach" size={30} color="#000" />
        ) : file.assets?.[0].mimeType === "application/pdf" ? (
          <MaterialCommunityIcons name="file-pdf-box" size={24} color="black" />
        ) : (
          <Image
            source={{ uri: file.assets?.[0].uri! }}
            style={{ width: "100%", height: "100%", borderRadius: 100 }}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={input ? handlerSend : handleOpenCamera}
        style={{
          maxWidth: 100,
          flex: 1,
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: paperTheme.colors.primary,
          borderRadius: paperTheme.borderRadius.full,
        }}
      >
        <Ionicons name={input ? "send" : "camera"} size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

//styles
const styles = StyleSheet.create({
  buttonIcon: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatInput;
