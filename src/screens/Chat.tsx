import styles from "../styles";
import ChatMessage from "../components/ChatMessage";
import { model } from '../api/firebaseConfig';
import { Message } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native"

const Chat = () => {
    const [prompt, setPrompt] = useState<Message>({} as Message);
    const [isChat, setIsChat] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const handlerPrompt = (field: keyof Message, value: string | Date) => {
        setPrompt(prev => ({ ...prev, [field]: value }));
    }

    const handlerSender = async () => {
        try {
            setIsChat(true);
            setIsLoading(true);

            setMessages(prev => [...prev, {
                origin: "user",
                message: prompt.message,
                date: new Date().toISOString(),
            }]);

            const result = await model.generateContent(prompt.message);

            setMessages(prev => [...prev, {
                origin: "agent",
                date: new Date().toISOString(),
                message: result.response.text(),
            }]);
        } catch (error) {
            console.log(error);
        } finally {
            handlerPrompt('message', "");
            setIsLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerList}>
                <View style={styles.containerText}>
                    <Text style={styles.title}>LABUBONICO</Text>
                    <Text style={styles.introText}>Peças dicas de como economizar, relatórios dos seus gastos, faça sua lista de mercado e muito mais.</Text>
                </View>
                {
                    isLoading ? <ActivityIndicator size={"large"} /> : <></>
                }
                {
                    isChat ?
                        <FlatList
                            data={messages}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) =>
                                <ChatMessage
                                    date={item.date}
                                    origin={item.origin}
                                    message={item.message}
                                />}
                        /> : <></>

                }
            </View>

            <View style={styles.containerRow}>
                <TouchableOpacity>
                    <Ionicons name='attach' style={styles.buttonIcon} size={30} color="#000" />
                </TouchableOpacity>

                <TextInput
                    autoFocus={true}
                    style={styles.input}
                    value={prompt.message}
                    placeholder='Peça ao Labubonico'
                    onChangeText={value => handlerPrompt('message', value)}
                />

                <TouchableOpacity onPress={handlerSender}>
                    <Ionicons name='send' style={styles.buttonIcon} size={30} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Chat;