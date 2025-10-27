import * as firestore from "firebase/firestore";
import { recipties } from "../api/firestore";
import { ChatSession } from "firebase/ai";
import { imageToJsonModel } from "../api/firebaseConfig";

const analyzeImage = async (base64: string, chat: ChatSession) => {
    const result = await chat.sendMessage([
        { text: "Identifique e categorize resumidamente as informações dos comprovantes fornecidos e diga que serão computados" },
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64,
            },
        },
    ]);

    const response = result.response.text();
    return response;
}

const extractImageDataToJson = async (base64: string) => {
    const result = await imageToJsonModel.generateContent([
        { text: "Crie um json baseado nas informações do comprovante." },
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64,
            }
        }
    ]);

    const doc = JSON.parse(result.response.text());

    await firestore.addDoc(recipties, doc);
}

export {
    analyzeImage,
    extractImageDataToJson,
}
