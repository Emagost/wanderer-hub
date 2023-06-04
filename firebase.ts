import firebase from 'firebase/compat/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
