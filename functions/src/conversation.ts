// import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/lib/firestore";
import * as functions from "firebase-functions";
import { db } from "./index";

type CreateMessageData = {
  interlocutorId: string;
  message: {
    id: string;
    authorID: string;
    content: any;
  };
};

/**
 * Create a new conversation, and add it to the participants' profiles
 * @param participantIds
 * @return New conversation ID
 */
const createConversation = (participantIds: string[]): Promise<string> =>
  new Promise(async (resolve) => {
    // Create conversation
    const conversations = db.collection("Conversations");
    const conversation = await conversations.add({
      participants: participantIds,
    });

    // Add conversation and interlocutors to each participant profile.
    for (const userId of participantIds) {
      const profile = db.doc(`Users/${userId}`);
      const interlocutorIds = participantIds.filter((id) => id !== userId);

      await profile.update({
        conversationIds: FieldValue.arrayUnion(conversation.id),
        interlocutorIds: FieldValue.arrayUnion(interlocutorIds),
      });
    }

    resolve(conversation.id);
  });

const createMessage = (
  conversationId: string,
  data: CreateMessageData
): Promise<string> =>
  new Promise(async (resolve) => {
    const messageData = data.message;

    const conversation = db.doc(`Conversations/${conversationId}`);
    const messages = conversation.collection("Messages");
    const message = await messages.add({
      ...messageData,
      time: FieldValue.serverTimestamp(),
    });

    resolve(message.id);
  });

/**
 * Send a message to a user. If no conversation exists, creates it.
 */
export const sendMessage = functions.https.onCall(
  (messageData: CreateMessageData, context): Promise<void> =>
    new Promise(async (resolve, reject) => {
      // Get participant ids
      const uid = context.auth?.uid;
      if (uid === undefined) {
        reject();
        return;
      }

      const interlocutorId = messageData.interlocutorId;

      // Get collections and docs
      const user = await db
        .doc(`Users/${uid}`)
        .get()
        .then((docSnap) => docSnap.data());
      if (user === undefined) return "failure";

      // If a conversation doesn't exist between the two, create one.
      if (!user.interlocutorIDs.includes(interlocutorId)) {
        const conversationId = await createConversation([uid, interlocutorId]);
        await createMessage(conversationId, messageData);
      }
      return "success";
    })
);
