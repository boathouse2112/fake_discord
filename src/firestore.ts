import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Let's try just exporting the database object. Wonder how that'll go.
export default db;
