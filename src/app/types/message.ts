export default interface IDataMessage {
  message: string;
  timestamp?: number;
  metadata: {
    displayName: string;
    photoURL: string;
    uid: string;
  };
}
