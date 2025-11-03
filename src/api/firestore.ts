import { database } from "./firebaseConfig";
import * as firestore from "firebase/firestore";

const receipties = firestore.collection(database, "receipts");

export { receipties }
