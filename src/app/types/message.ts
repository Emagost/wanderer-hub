import { type FieldValue } from 'firebase/firestore';

export default interface IDataMessage {
  message: string;
  createdAt: FieldValue;
  metadata: {
    displayName: string;
    photoURL: string;
    uid: string;
  };
}
