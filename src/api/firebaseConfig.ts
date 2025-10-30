// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getAI, getGenerativeModel, GoogleAIBackend, Schema } from "firebase/ai";

const imageToJsonSchema = Schema.object({
  properties: {
    extractable: Schema.number(),
    errorMessage: Schema.string(),
    price: Schema.number({
      description: "Para valores não definidos atribua 0.00"
    }),
    local: Schema.string(),
    category: Schema.string(),
    timestamp: Schema.string(),
    items: Schema.array({
      items: Schema.object({
        properties: {
          name: Schema.string(),
          price: Schema.number(),
        },
      }),
    }),
  },
  optionalProperties: [
    "errorMessage",
    "price",
    "local",
    "category",
    "timestamp",
    "items",
  ],
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

// Initialize Firestore
const database = getFirestore(app);

// Initialize the Gemini Developer API backend service
const ai = getAI(app, { backend: new GoogleAIBackend() });

// Create a `GenerativeModel` instance with a model that supports your use case
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

export const auth = initializeAuth(app);

export { database, model, imageToJsonModel };
