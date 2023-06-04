// Firebase
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase';
// Types
import type IDataMessage from '../types/message';

const sendMessageDB = async (data: IDataMessage) => {
  const { message, metadata } = data;

  const messagesCollectionRef = collection(db, 'generalMessages');
  const newMessage = {
    message,
    timestamp: new Date().getTime(),
    metadata: {
      name: metadata.displayName,
      uid: metadata.uid,
      photoURL: metadata.photoURL,
    },
  };

  await addDoc(messagesCollectionRef, newMessage);
};

export default sendMessageDB;