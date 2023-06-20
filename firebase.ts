import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import dotenv from 'dotenv'

const FIREBASE_CONFIG = dotenv.config().parsed

const firebaseConfig = {
  apiKey: `${FIREBASE_CONFIG?.FIREBASE_API_KEY}`,
  authDomain: `${FIREBASE_CONFIG?.FIREBASE_AUTH_DOMAIN}`,
  projectId: `${FIREBASE_CONFIG?.FIREBASE_PROJECT_ID}`,
  storageBucket: `${FIREBASE_CONFIG?.FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${FIREBASE_CONFIG?.FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${FIREBASE_CONFIG?.FIREBASE_APP_ID}`,
  measurementId: `${FIREBASE_CONFIG?.FIREBASE_MEASUREMENT_ID}`,
}

let dbInstance: ReturnType<typeof getFirestore> | null = null

export const getDBInstance = () => {
  if (!dbInstance) {
    const app = initializeApp(firebaseConfig)
    dbInstance = getFirestore(app)
  }

  return dbInstance
}
