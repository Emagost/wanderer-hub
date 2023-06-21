import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
}

let dbInstance: ReturnType<typeof getFirestore> | null = null

export const getDBInstance = () => {
  if (!dbInstance) {
    const app = initializeApp(firebaseConfig)
    dbInstance = getFirestore(app)
  }

  return dbInstance
}
