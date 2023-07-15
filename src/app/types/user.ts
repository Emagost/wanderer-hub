export interface IUser {
  email: string
  name: string
  photoURL: string
  uid: string
  description?: string
  location?: string
  friends?:[]
  travels?:[]
  metadata: {
    creationTime: string
    lastSignInTime: string
  }
}
