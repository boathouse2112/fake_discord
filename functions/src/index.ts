import { getFirestore } from "firebase-admin/firestore";
import { initializeUser } from "./initializeUser";
import { sendMessage } from "./conversation";
import * as admin from "firebase-admin";

admin.initializeApp();
export const firestore = getFirestore();

export { initializeUser, sendMessage };
