import { imageToJsonModel } from "../api/firebaseConfig";
import { JSONResponse } from "../types";

const extractImageDataToJson = async (base64: string) => {
  console.log("Analyzing image and extracting JSON data...");
  const categories = ["ALIMENTAÇÃO", "TRANSPORTE", "LAZER", "OUTROS"];

  // Strip the data URI prefix if present (e.g., "data:image/png;base64,")
  const cleanBase64 = base64.includes(",") ? base64.split(",")[1] : base64;

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
        "price": "valor total em centavos (SEM vírgula ou ponto). Ex: 1000 para R$10.00, 2550 para R$25.50",
        "timestamp": "APENAS se extractable=1 - formato ISO 8601: YYYY-MM-DDTHH:mm:ss (use fuso horário de Brasília UTC-3 se houver ambiguidade). Retorne SOMENTE o timestamp, sem qualquer texto adicional ou explicação.",
        "items": "[array de objetos com name, quantity e price] de itens comprados se identificados. Exemplo: [{name: 'Café', quantity: 2, price: 500}, {name: 'Pão', quantity: 1, price: 300}]"
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
      - Retorne EXATAMENTE o timestamp em formato ISO 8601 (ex: 2018-03-28T16:31:00)
      - NUNCA inclua explicações, texto adicional ou informações sobre fuso horário
      - O campo "timestamp" deve conter APENAS um valor de data/hora, nada mais
      - Se não conseguir extrair data/hora, deixe como string vazia ""

      NÃO retorne category ou dados se extractable = 0.
      Seja RÍGIDO: quando em dúvida, rejeite (extractable = 0).`,
    },
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: cleanBase64,
      },
    },
  ]);

  console.log("Image analysis complete.");
  const doc: JSONResponse = JSON.parse(result.response.text());
  console.log("Extracted JSON:", doc);
  return doc;
};

export { extractImageDataToJson };
