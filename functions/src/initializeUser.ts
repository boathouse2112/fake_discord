import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

const initializeUser = functions.auth.user().onCreate((user) => {
  admin.firestore().collection('Users').doc(user.uid).set({
    name: user.displayName,
    conversationIDs: [],
    interlocutorIDs: [],
  });
});

export { initializeUser };
