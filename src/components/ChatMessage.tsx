import styles from "../styles";
import { Message } from "../types";
import { Image, Text, View } from "react-native";

const ChatMessage = ({ role, content, file }: Message) => {
  return (
    <View style={role != "user" ? styles.messageAgent : styles.messageUser}>
      {file && file.mimeType === "application/pdf" ? (
        <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 8 }}>
          📄 {file.name || "Document.pdf"}
        </Text>
      ) : (
        file && (
          <Image
            source={{ uri: file.uri }}
            style={{ width: 120, height: 120 }}
          />
        )
      )}
      <Text style={role != "user" ? { color: "#f1f1f1" } : undefined}>
        {content}
      </Text>
    </View>
  );
};

export default ChatMessage;
