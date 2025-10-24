import styles from "../styles";
import { Message } from "../types";
import { Text, View } from "react-native";

const ChatMessage = (message: Message) => {
    return(
        <View style={ message.origin != "user" ? styles.messageAgent : styles.messageUser}>
            <Text style={message.origin != "user" ? {color: "#f1f1f1"} : undefined}>{message.message}</Text>
        </View>
    )
}

export default ChatMessage;