import styles from "../styles";
import ChatMessage from "../components/ChatMessage";
import { model } from "../api/firebaseConfig";
import { Message } from "../types";
import { Ionicons } from "@expo/vector-icons";
import { pickImage } from "../utils/pickImage";
import { useRef, useState } from "react";
import {
  analyzeImageWithConfidence,
  extractImageDataToJson,
} from "../utils/analyzeImage";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Chat = () => {
  const [prompt, setPrompt] = useState<Message>({} as Message);
  const [isChat, setIsChat] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const chatRef = useRef(
    model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: "Você é um assistente que analisa comprovantes e responde perguntas sobre finanças somente.",
            },
          ],
        },
      ],
    })
  );

  const handlerPrompt = (field: keyof Message, value: string | Date) => {
    setPrompt((prev) => ({ ...prev, [field]: value }));
  };

  const handlerSender = async () => {
    try {
      setIsChat(true);
      setIsLoading(true);

      setMessages((prev) => [
        ...prev,
        {
          type: "message",
          role: "user",
          content: prompt.content,
          timestamp: new Date().toISOString(),
        },
      ]);

      const result = await chatRef.current.sendMessage(prompt.content);

      setMessages((prev) => [
        ...prev,
        {
          type: "message",
          role: "agent",
          content: result.response.text(),
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      handlerPrompt("content", "");
      setIsLoading(false);
    }
  };

  const handlerPick = async () => {
    setIsChat(true);
    setIsLoading(true);

    const imagePicked = await pickImage();

    if (!imagePicked) {
      setIsLoading(false);
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        type: "image",
        content: "imagem",
        imageUri: imagePicked.uri,
        timestamp: Date.now().toString(),
      },
    ]);

    try {
      const analysis = await analyzeImageWithConfidence(
        imagePicked.base64!,
        chatRef.current
      );
      let response = "";

      if (!analysis.confidence || !analysis.precision) return null;

      if (analysis.confidence > 8 && analysis.precision > 8) {
        await extractImageDataToJson(imagePicked.base64!);
        response = analysis.analysis;
      } else {
        response =
          "Imagem muito borrada/má qualidade, por favor, tente novamente.";
        console.log(analysis.rawResponse);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          type: "message",
          content: response ? response : "Não foi possivel analizar a imagem",
          timestamp: Date.now().toString(),
        },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
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
                type={item.type}
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
        {isLoading ? <ActivityIndicator size={"large"} /> : <></>}
      </View>

      <View style={styles.containerRow}>
        <TouchableOpacity onPress={handlerPick}>
          <Ionicons
            name="attach"
            style={styles.buttonIcon}
            size={30}
            color="#000"
          />
        </TouchableOpacity>

        <TextInput
          autoFocus={true}
          style={styles.input}
          value={prompt.content}
          placeholder="Peça ao Labubonico"
          onChangeText={(value) => handlerPrompt("content", value)}
        />

        <TouchableOpacity
          onPress={handlerSender}
          disabled={!prompt.content}
          style={{ opacity: !prompt.content ? 0.5 : 1 }}
        >
          <Ionicons
            name="send"
            style={styles.buttonIcon}
            size={30}
            color="#000"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
