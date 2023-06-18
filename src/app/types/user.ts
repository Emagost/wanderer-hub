export interface IUser {
  email: string
  name: string
  photoURL: string
  uid: string
  description?: string
  metadata: {
    creationTime: string
    lastSignInTime: string
  }
}
