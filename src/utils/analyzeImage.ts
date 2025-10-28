import * as firestore from "firebase/firestore";
import { recipties } from "../api/firestore";
import { ChatSession } from "firebase/ai";
import { imageToJsonModel } from "../api/firebaseConfig";

const analyzeImage = async (base64: string, chat: ChatSession) => {
  const result = await chat.sendMessage([
    {
      text: `Analise o comprovante e inicie sua resposta com: 
      CONFIDENCE:X onde X é um número de 0 a 10 indicando sua confiança na extração dos dados. 
      PRECISION:Y onde Y é um número de 0 a 10 indicando a clareza/qualidade da imagem.
      
      INSTRUÇÕES IMPORTANTES:
      - Extraia APENAS as informações que são claramente visíveis no comprovante
      - Se uma informação não estiver visível ou legível, indique "NÃO IDENTIFICADO"
      - NÃO invente, assuma ou deduza informações que não estão explícitas na imagem
      - Se o texto estiver borrado, cortado ou ilegível, mencione isso
      - Para valores monetários, extraia apenas se os números estão completamente visíveis
      - Para datas, extraia apenas se estão claramente legíveis
      
      Identifique e categorize SOMENTE as informações que você consegue ler com certeza no comprovante.`,
    },
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64,
      },
    },
  ]);

  const response = result.response.text();
  return response;
};

const extractConfidence = (
  response: string
): { confidence: number | null; precision: number | null } => {
  const confidence = response.match(/CONFIDENCE:\s*(\d+)/i);
  const precision = response.match(/PRECISION:\s*(\d+)/i);
  return {
    confidence: confidence ? parseInt(confidence[1], 10) : null,
    precision: precision ? parseInt(precision[1], 10) : null,
  };
};

// Função que retorna análise com confiança extraída
const analyzeImageWithConfidence = async (
  base64: string,
  chat: ChatSession
) => {
  const response = await analyzeImage(base64, chat);
  const confidence = extractConfidence(response);

  // Remove o "CONFIDENCE:X" e "PRECISION:Y" da análise para deixar apenas o texto limpo
  const cleanAnalysis = response
    .replace(/CONFIDENCE:\s*\d+\s*/i, "")
    .replace(/PRECISION:\s*\d+\s*/i, "")
    .trim();

  return {
    analysis: cleanAnalysis,
    confidence: confidence.confidence,
    precision: confidence.precision,
    rawResponse: response,
  };
};

const extractImageDataToJson = async (base64: string) => {
  const categories = ["ALIMENTAÇÃO", "TRANSPORTE", "LAZER", "OUTROS"];
  const result = await imageToJsonModel.generateContent([
    {
      text: `Analise a qualidade da imagem e extraia informações do comprovante.

      ANÁLISE DE QUALIDADE DA IMAGEM:
      1. Primeiro, analise se a imagem tem qualidade suficiente para extração de dados
      2. Verifique se o texto está legível, se a imagem não está muito borrada, escura ou cortada
      3. Se a imagem for de boa qualidade e for possível extrair informações: extractable = 1
      4. Se a imagem for de má qualidade ou não for possível extrair informações: extractable = 0

      REGRAS PARA EXTRAÇÃO:
      - extractable: OBRIGATÓRIO - 0 (não é possível extrair) ou 1 (é possível extrair)
      - Se extractable = 0: inclua errorMessage explicando o problema com a imagem
      - Se extractable = 1: extraia as informações disponíveis
      - category: deve ser APENAS uma das opções: ${categories.join(", ")}
      - Para campos não visíveis ou ilegíveis, use null
      - NÃO invente, assuma ou deduza informações que não estão explícitas na imagem
      - Se um valor estiver parcialmente visível, indique isso no campo correspondente
      - Mantenha a estrutura JSON válida

      CATEGORIZAÇÃO:
      - Analise o tipo de estabelecimento e produtos/serviços para definir a categoria
      - Use apenas uma das categorias disponíveis: ${categories.join(", ")}`,
    },
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64,
      },
    },
  ]);

  const doc = JSON.parse(result.response.text());

  console.log(doc);

  await firestore.addDoc(recipties, doc);
};

export {
  analyzeImage,
  analyzeImageWithConfidence,
  extractConfidence,
  extractImageDataToJson,
};
