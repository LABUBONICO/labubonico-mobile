import { database } from "./firebaseConfig";
import * as firestore from "firebase/firestore";

const recipties = firestore.collection(database, "receipts");

export { recipties }
