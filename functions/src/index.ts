import { initializeUser } from "./initializeUser";
import { sendMessage } from "./conversation";
import * as admin from "firebase-admin";

admin.initializeApp();
export const db = admin.firestore();

export { initializeUser, sendMessage };
