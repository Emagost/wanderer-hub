import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

let dbInstance: ReturnType<typeof getFirestore> | null = null

export const getDBInstance = () => {
  if (!dbInstance) {
    const app = initializeApp(firebaseConfig)
    dbInstance = getFirestore(app)
  }

  return dbInstance
}
