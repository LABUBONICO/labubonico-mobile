import { JSONResponse } from "../types";
import { imageToJsonModel } from "../api/firebaseConfig";
import { Category } from "../contexts/CategoriesContext";

const extractImageDataToJson = async (
  base64: string,
  categories: Category[]
) => {
  console.log("Analyzing image and extracting JSON data...");

  const categoryNames = categories.map((cat) => cat.name).join(", ");

  const result = await imageToJsonModel.generateContent([
    {
      text: `Você é um validador rigoroso de comprovantes. Analise a qualidade da imagem e extraia informações APENAS se a qualidade for aceitável.
      ANÁLISE DE QUALIDADE (PRIORIDADE MÁXIMA):
      1. Verifique se o texto é legível (não está borrado, pixelado ou distorcido)
      2. Verifique se a imagem não está muito escura, muito clara ou com contraste ruim
      3. Verifique se o comprovante não está cortado ou com partes faltando
      4. Verifique se é possível identificar claramente o estabelecimento e valores
      
      CRITÉRIOS RIGOROSOS PARA REJEIÇÃO (accuracy < 0.7):
      - Imagem muito borrada ou pixelada
      - Texto ilegível ou com baixo contraste
      - Comprovante parcialmente cortado
      - Imagem muito escura ou muito clara (backlight)
      - Valores ou datas não conseguem ser lidos claramente
      - Qualidade geral inadequada para OCR
      RESPOSTA OBRIGATÓRIA:
      - Se a imagem NÃO atender aos critérios de qualidade: inclua errorMessage detalhado
      - Se a imagem atender aos critérios: extraia os dados

      CAMPOS DA RESPOSTA JSON:
      {
        "category": "deve ser APENAS uma das opções: ${categoryNames}",
        "local": "nome do estabelecimento se identificado",
        "price": "valor total em centavos (SEM vírgula ou ponto). Ex: 1000 para R$10.00, 2550 para R$25.50",
        "timestamp": "formato ISO 8601: YYYY-MM-DDTHH:mm:ss (horário local de Brasília UTC-3, SEM indicador de fuso). Retorne SOMENTE o timestamp, sem qualquer texto adicional ou explicação.",
        "items": "[array de objetos com name, quantity e price] de itens comprados se identificados. Exemplo: [{name: 'Café', quantity: 2, price: 500}, {name: 'Pão', quantity: 1, price: 300}]"
        "accuracy": "número entre 0 e 1 indicando a confiança na extração dos dados",
        "errorMessage": "apenas se accuracy < 0.7 - mensagem detalhada explicando os motivos da rejeição",
      }

      IMPORTANTE SOBRE PREÇOS:
      - Retorne SEMPRE em centavos como número inteiro (ex: 1000 = R$10.00)
      - NUNCA use vírgula ou ponto
      - Para R$25.50, retorne: 2550
      - Para R$100.99, retorne: 10099
      - Aplique isso para "price" e para todos os "items[].price"

      IMPORTANTE SOBRE ITENS:
      - Cada item deve ter: name (string), quantity (número inteiro), price (em centavos, sem separadores)
      - quantity deve ser um número inteiro positivo (ex: 1, 2, 3, etc.)
      - Se não conseguir extrair a quantidade, use 1 como padrão
      - price aqui é o preço total dos itens (não o preço unitário)

      IMPORTANTE SOBRE TIMESTAMP:
      - Retorne EXATAMENTE o timestamp em formato ISO 8601 SEM fuso horário (ex: 2018-03-28T16:31:00)
      - NUNCA inclua Z, +XX:XX, ou qualquer indicador de fuso horário
      - NUNCA inclua explicações, texto adicional ou informações sobre fuso horário
      - O campo "timestamp" deve conter APENAS um valor de data/hora, nada mais
      - Se não conseguir extrair data/hora, deixe como string vazia ""

      NÃO retorne category ou dados se accuracy < 0.7.`,
    },
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64,
      },
    },
  ]);

  const json: JSONResponse = JSON.parse(result.response.text());

  // Convert ISO string timestamp to Date object (treating it as Brazil timezone UTC-3)
  if (json.timestamp) {
    try {
      const timestampValue = json.timestamp as any;

      // If it's already a string from the API response
      if (typeof timestampValue === "string" && timestampValue.length > 0) {
        // Parse the ISO string as if it's in Brazil timezone (UTC-3)
        // The timestamp from the model is in format YYYY-MM-DDTHH:mm:ss (local Brasilia time)
        // We need to convert it to UTC by adding 3 hours
        const date = new Date(timestampValue);

        // Adjust for Brazil timezone (UTC-3): add 3 hours to convert local time to UTC
        const utcDate = new Date(date.getTime() + 3 * 60 * 60 * 1000);
        json.timestamp = utcDate as any;
      }
    } catch (error) {
      console.error("Error parsing timestamp:", error);
    }
  }

  return json;
};

export { extractImageDataToJson };
