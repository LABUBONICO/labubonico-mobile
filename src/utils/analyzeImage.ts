import { ChatSession } from "firebase/ai";

export async function analyzeImage(base64: string, chat: ChatSession) {
  const result = await chat.sendMessage([
    { text: "Identifique as informações (Valor, Categoria, Data e Hora, Bandeira do cartão) dos comprovantes fornecidos e diga que serão computados" },
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
