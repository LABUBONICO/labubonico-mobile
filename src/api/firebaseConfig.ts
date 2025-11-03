// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getAI, getGenerativeModel, GoogleAIBackend, Schema } from "firebase/ai";

const imageToJsonSchema = Schema.object({
  properties: {
    price: Schema.number({
      description: "Para valores não definidos atribua 0.00"
    }),
    local: Schema.string(),
    category: Schema.string(),
    timestamp: Schema.string(),
    items: Schema.array({
      items: Schema.object({
        nullable: true,
        properties: {
          name: Schema.string(),
          price: Schema.number(),
        },
      }),
    }),
    accuracy: Schema.number({
      description: "Valor de 0 a 1 que representa a precisão da extração dos dados."
    }),
    errorMessage: Schema.string({
      nullable: true,
      description: "Em caso de accuracy baixa crie uma mensagem de erro",
    })
  },
  optionalProperties: ["items", "errorMessage"],
});

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = initializeAuth(app);

// Initialize Firestore
const database = getFirestore(app);

// Initialize the Gemini Developer API backend service
const ai = getAI(app, { backend: new GoogleAIBackend() });

const model = getGenerativeModel(ai, {
  model: "gemini-2.5-flash",
  systemInstruction: `
    Você é um assistente financeiro. 
    Seu nome é Labubonico. 
    Responda sempre em português brasileiro.
    Ignore imagens ou PDFs fornecidos que não sejam de comprovantes financeiros`,
});

const imageToJsonModel = getGenerativeModel(ai, {
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: imageToJsonSchema,
  },
});

export { auth, database, model, imageToJsonModel };
