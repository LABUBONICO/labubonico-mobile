import { paperTheme } from "../theme/theme";
import { Message } from "../types";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

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
      {role != "user" && (
        <Image
          source={require("../../assets/images/labubonico_logo.png")}
          style={{
            width: 20,
            height: 20,
            marginBottom: paperTheme.spacing.sm,
          }}
        />
      )}
      <Text variant="titleLarge">{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageUser: {
    textAlign: "justify",
    padding: paperTheme.spacing.md,
    maxWidth: "75%",
    alignSelf: "flex-end",
    backgroundColor: paperTheme.colors.surface,
  },
  messageAgent: {
    textAlign: "justify",
    padding: paperTheme.spacing.md,
    alignSelf: "flex-start",
  },
});

export default ChatMessage;
