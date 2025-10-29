import styles from "../styles";
import ChatMessage from "../components/ChatMessage";
import { model } from "../api/firebaseConfig";
import { Message } from "../types";
import { Ionicons } from "@expo/vector-icons";
import { pickImage } from "../utils/pickImage";
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
import * as ImagePicker from "expo-image-picker";

const Chat = () => {
  const [input, setInput] = useState<string>("");
  const [isChat, setIsChat] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const chatRef = useRef(
    model.startChat({
      history: [],
    })
  );

  const handlerFilePick = async () => {
    const imagePicked = await pickImage();
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
        imageUri: file?.uri,
        timestamp: Date.now().toString(),
      },
    ]);
    try {
      const messageParts: any[] = [{ text: input }];

      if (file?.base64) {
        messageParts.push({
          inlineData: {
            mimeType: "image/jpeg",
            data: file.base64,
          },
        });
      }

      const response = await chatRef.current.sendMessage(messageParts);

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
                imageUri={item.imageUri}
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
              source={{ uri: file.uri! }}
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
