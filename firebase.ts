import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import dotenv from 'dotenv'

dotenv.config() // Cargar variables de entorno desde el archivo .env

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

let dbInstance: ReturnType<typeof getFirestore> | null = null

export const getDBInstance = () => {
  if (!dbInstance) {
    const app = initializeApp(firebaseConfig)
    dbInstance = getFirestore(app)
  }

  return dbInstance
}
