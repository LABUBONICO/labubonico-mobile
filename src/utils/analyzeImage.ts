import * as firestore from "firebase/firestore";
import { Receipt } from "../types";
import { receipties } from "../api/firestore";
import { imageToJsonModel } from "../api/firebaseConfig";

const extractImageDataToJson = async (base64: string) => {

  const result = await imageToJsonModel.generateContent([
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64,
      },
    },
  ]);

  const json: Receipt = JSON.parse(result.response.text());

  if (json.accuracy > 0.8) {
    //console.log(json);
    try {
      await firestore.addDoc(receipties, json);
    } catch (error) {
      console.error(error)
    }
  }
  return json;
};

export { extractImageDataToJson };
