import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { Status } from '../types/status';
import { db } from '../../../firebase';
import type IDataMessage from '../types/message';

const useGetMessages = () => {
  const [status, setStatus] = useState<Status>(Status.loading);
  const [messages, setMessages] = useState<IDataMessage[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'generalMessages'),
      (snapshot) => {
        const messages = snapshot.docs.map((doc) => doc.data() as IDataMessage);
        setMessages(messages);
        setStatus(Status.success);
      },
      (error) => {
        console.error('Error retrieving messages:', error);
        setStatus(Status.failed);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return { status, messages };
};

export default useGetMessages;
