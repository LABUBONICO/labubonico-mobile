import styles from "../styles";
import ChatMessage from "../components/ChatMessage";
import { model } from "../api/firebaseConfig";
import { Message } from "../types";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { extractImageDataToJson } from "../utils/analyzeImage";

const Chat = () => {
  const [input, setInput] = useState<string>("");
  const [isChat, setIsChat] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [file, setFile] = useState<DocumentPicker.DocumentPickerResult | null>(
    null
  );

  const chatRef = useRef(
    model.startChat({
      history: [],
    })
  );

  const handlerFilePick = async () => {
    const imagePicked = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
      copyToCacheDirectory: true,
    });
    setFile(imagePicked);
  };

  const handlerSend = async () => {
    setIsChat(true);
    setIsLoading(true);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
        file: file?.assets?.[0]
          ? {
              uri: file.assets[0].uri,
              mimeType: file.assets[0].mimeType,
              name: file.assets[0].name,
            }
          : undefined,
        timestamp: Date.now().toString(),
      },
    ]);
    try {
      const messageParts: any[] = [{ text: input }];

      if (file?.assets?.[0]?.base64) {
        const mimeType = file.assets[0].mimeType || "image/jpeg";
        // Remove data URI prefix if present (e.g., "data:application/pdf;base64,...")
        const base64Data = file.assets[0].base64.replace(
          /^data:[^;]+;base64,/,
          ""
        );

        messageParts.push({
          inlineData: {
            mimeType: mimeType,
            data: base64Data,
          },
        });
      }

      const response = await chatRef.current.sendMessage(messageParts);
      await extractImageDataToJson(messageParts[1].inlineData.data);

      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          content: response.response.text(),
          timestamp: Date.now().toString(),
        },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setInput("");
      setFile(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerList}>
        {isChat ? (
          <FlatList
            data={messages}
            keyExtractor={(item) => item.timestamp}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <ChatMessage
                role={item.role}
                content={item.content}
                timestamp={item.timestamp}
                file={item.file}
              />
            )}
          />
        ) : (
          <View style={styles.containerText}>
            <Text style={styles.title}>LABUBONICO</Text>
            <Text style={styles.introText}>
              Peças dicas de como economizar, relatórios dos seus gastos, faça
              sua lista de mercado e muito mais.
            </Text>
          </View>
        )}
      </View>

      <View style={{ padding: 10 }}>
        {isLoading && <ActivityIndicator size={"large"} />}
      </View>

      <View style={styles.containerRow}>
        <TextInput
          autoFocus={true}
          style={styles.input}
          value={input}
          placeholder="Peça ao Labubonico"
          onChangeText={setInput}
        />

        <TouchableOpacity
          onPress={file ? () => setFile(null) : handlerFilePick}
          style={styles.buttonIcon}
        >
          {!file ? (
            <Ionicons name="attach" size={30} color="#000" />
          ) : (
            <Image
              source={{ uri: file.assets?.[0].uri! }}
              style={{ width: "100%", height: "100%", borderRadius: 100 }}
            />
          )}
        </TouchableOpacity>

        {/* change to navigate to camera screen */}
        <TouchableOpacity
          onPress={input ? handlerSend : handlerSend}
          style={styles.buttonIcon}
        >
          <Ionicons name={input ? "send" : "camera"} size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
