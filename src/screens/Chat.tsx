import styles from "../styles";
import ChatMessage from "../components/ChatMessage";
import { model } from "../api/firebaseConfig";
import { Message } from "../types";
import { useRef, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";

import ChatInput from "../components/ChatInput";
import { paperTheme } from "../theme/theme";
import ChatWellcome from "../components/ChatWellcome";

const Chat = ({ navigation }: NativeStackScreenProps<MainStackParamList>) => {
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
    <View
      style={{
        ...styles.container,
        backgroundColor: paperTheme.colors.primary,
        flex: 1,
      }}
    >
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
          <ChatWellcome setInput={setInput} />
        )}
      </View>

      <View style={{ padding: 10 }}>
        {isLoading && <ActivityIndicator size={"large"} />}
      </View>

      <ChatInput
        input={input}
        setInput={setInput}
        navigation={navigation}
        file={file}
        setFile={setFile}
        handlerSend={handlerSend}
      />
    </View>
  );
};

export default Chat;
