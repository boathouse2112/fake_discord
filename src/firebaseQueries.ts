import { doc, getDoc } from 'firebase/firestore';
import firestore from './firestore';
import { User, UserSchema } from './types';

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

const fetchInterlocutors = async (userID: string): Promise<string[]> => {
  const docRef = doc(firestore, 'Users', userID);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw Error(`No document found: Users/${userID}`);
  }

  const ids: string[] = docSnap.get('interlocutorIDs');
  return ids;
};

const fetchUserName = async (userID: string): Promise<string> => {
  const docRef = doc(firestore, 'Users', userID);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw Error(`No document found: Users/${userID}`);
  }

  const name: string = docSnap.get('name');
  return name;
};

const fetchUserNames = async (userIDs: string[]): Promise<string[]> => {
  return Promise.all(userIDs.map(fetchUserName));
};

export { fetchUser, fetchUserNames };
