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

export { fetchUser };
