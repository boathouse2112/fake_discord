import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";

export const sendMessage = httpsCallable(functions, "sendMessage");
