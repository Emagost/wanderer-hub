// Firebase
import { addDoc, collection } from 'firebase/firestore'
import { getDBInstance } from '../../../firebase'
// Types
import type IDataMessage from '../types/message'

const sendMessageDB = async (data: IDataMessage) => {
  const db = getDBInstance()
  const { message, metadata, createdAt } = data

  const messagesCollectionRef = collection(db, 'generalMessages')
  const newMessage = {
    message,
    metadata: {
      displayName: metadata.displayName,
      uid: metadata.uid,
      photoURL: metadata.photoURL,
    },
    createdAt,
  }

  await addDoc(messagesCollectionRef, newMessage)
}

export default sendMessageDB
