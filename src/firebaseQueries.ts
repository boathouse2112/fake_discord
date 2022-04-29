import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import firestore from './firestore';
import { Conversation, ConversationSchema, User, UserSchema } from './types';

const fetchUser = async (userID: string): Promise<User> => {
  const docRef = doc(firestore, 'Users', userID);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw Error(`No document found: Users/${userID}`);
  }

  const userData = docSnap.data();

  // Set the id field, rename interlocutors and directMessages to match the type
  userData.id = userID;
  delete Object.assign(userData, {
    interlocutorIDs: userData['interlocutors'],
  })['interlocutors'];
  delete Object.assign(userData, {
    directMessageIDs: userData['directMessages'],
  })['directMessages'];

  return UserSchema.parse(userData);
};

const fetchSingleConversationParticipants = async (
  conversationID: string
): Promise<{ conversationID: string; participants: string[] }> => {
  const docRef = doc(firestore, 'DirectMessages', conversationID);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw Error(`No document found: DirectMessages/${conversationID}`);
  }

  const participants = docSnap.get('participants');
  return { conversationID, participants };
};

const fetchConversationParticipants = async (
  conversationIDs: string[]
): Promise<{ conversationID: string; participants: string[] }[]> => {
  return Promise.all(
    conversationIDs.map((id) => fetchSingleConversationParticipants(id))
  );
};

const fetchConversation = async (
  conversationID: string
): Promise<Conversation> => {
  const docRef = doc(firestore, 'DirectMessages', conversationID);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw Error(`No document found: DirectMessages/${conversationID}`);
  }

  const conversationData = docSnap.data();

  const messagesCollectionRef = collection(
    firestore,
    'DirectMessages',
    conversationID,
    'Messages'
  );
  const messagesCollectionSnap = await getDocs(messagesCollectionRef);
  const messages = messagesCollectionSnap.docs.map((docSnap) => {
    const message = docSnap.data();

    // Set message fields
    message.id = docSnap.id;
    delete Object.assign(message, {
      authorID: message['author'],
    })['author'];
    message.time = 'time';
    message.content = { type: 'text', text: message.content };
    return message;
  });

  conversationData.messages = messages;

  console.log(conversationData);
  return ConversationSchema.parse(conversationData);
};

export { fetchUser, fetchConversationParticipants, fetchConversation };
