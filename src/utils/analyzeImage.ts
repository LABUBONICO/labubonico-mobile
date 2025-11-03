import { JSONResponse } from "../types";
import { imageToJsonModel } from "../api/firebaseConfig";

const extractImageDataToJson = async (base64: string) => {
  const categories = ["ALIMENTAÇÃO", "TRANSPORTE", "LAZER", "OUTROS"];
  const result = await imageToJsonModel.generateContent([
    {
      text: `Você é um validador rigoroso de comprovantes. Analise a qualidade da imagem e extraia informações APENAS se a qualidade for aceitável.
      ANÁLISE DE QUALIDADE (PRIORIDADE MÁXIMA):
      1. Verifique se o texto é legível (não está borrado, pixelado ou distorcido)
      2. Verifique se a imagem não está muito escura, muito clara ou com contraste ruim
      3. Verifique se o comprovante não está cortado ou com partes faltando
      4. Verifique se é possível identificar claramente o estabelecimento e valores
      
      CRITÉRIOS RIGOROSOS PARA REJEIÇÃO (extractable = 0):
      - Imagem muito borrada ou pixelada
      - Texto ilegível ou com baixo contraste
      - Comprovante parcialmente cortado
      - Imagem muito escura ou muito clara (backlight)
      - Valores ou datas não conseguem ser lidos claramente
      - Qualidade geral inadequada para OCR
      RESPOSTA OBRIGATÓRIA:
      - Se a imagem NÃO atender aos critérios de qualidade: extractable = 0 e inclua errorMessage detalhado
      - Se a imagem atender aos critérios: extractable = 1 e extraia os dados

      CAMPOS DA RESPOSTA JSON:
      {
        "extractable": 0 ou 1 (OBRIGATÓRIO),
        "errorMessage": "descrição do problema se extractable=0, string vazia se extractable=1",
        "category": "apenas se extractable=1 - deve ser APENAS uma das opções: ${categories.join(
          ", "
        )}",
        "local": "nome do estabelecimento se identificado",
        "price": "valor total se identificado",
        "timestamp": "data se identificada",
        "items": "[array de objetos com name e price] de itens comprados se identificados"
      }
      NÃO retorne category ou dados se extractable = 0.
      Seja RÍGIDO: quando em dúvida, rejeite (extractable = 0).`,
    },
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64,
      },
    },
  ]);

  const json: JSONResponse = JSON.parse(result.response.text());

  return json;
};

export { extractImageDataToJson };
