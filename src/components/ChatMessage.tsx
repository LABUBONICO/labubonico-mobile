import styles from "../styles";
import { Message } from "../types";
import { Image, Text, View } from "react-native";

const ChatMessage = ({ role, type, content, imageUri }: Message) => {
    return (
        <View style={role != "user" ? styles.messageAgent : styles.messageUser}>
            {
                type === "message" ?
                <Text style={role != "user" ? { color: "#f1f1f1" } : undefined} >{content}</Text> :
                <Image source={{uri: imageUri}} style={{width: 120, height: 120}}/>
            }
        </View>
    )
}

export default ChatMessage;