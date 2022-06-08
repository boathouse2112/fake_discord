import * as functions from "firebase-functions";
import { firestore } from "./index";

const initializeUser = functions.auth.user().onCreate((user) =>
  firestore.collection("Users").doc(user.uid).set({
    name: user.displayName,
    conversationIds: [],
    interlocutorIds: [],
  })
);

export { initializeUser };
