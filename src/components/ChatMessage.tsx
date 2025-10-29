import styles from "../styles";
import { Message } from "../types";
import { Image, Text, View } from "react-native";

const ChatMessage = ({ role, content, imageUri }: Message) => {
  return (
    <View style={role != "user" ? styles.messageAgent : styles.messageUser}>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 120, height: 120 }} />
      )}
      <Text style={role != "user" ? { color: "#f1f1f1" } : undefined}>
        {content}
      </Text>
    </View>
  );
};

export default ChatMessage;
