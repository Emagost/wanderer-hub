import React, { useCallback, useMemo, useState } from 'react';
// Firebase
import { serverTimestamp } from 'firebase/firestore';
// Types
import { type User } from 'firebase/auth';
import sendMessageDB from '@/app/utils/sendMessageDB';

interface TProps {
  user: User;
}

const TextField = ({ user }: TProps) => {
  const [message, setMessage] = useState<string>('');

  const handleSetMessage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(event.target.value);
    },
    []
  );

  const useHasData = useMemo(
    () => user.displayName && user.photoURL && user.uid,
    [user]
  );

  const handleOnSubmitMessage = useCallback(async () => {
    if (!message) return;
    if (!useHasData) return;

    try {
      setMessage('');
      await sendMessageDB({
        message,
        metadata: user as any,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [message, useHasData, user]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleOnSubmitMessage();
      }
    },
    [handleOnSubmitMessage]
  );

  return (
    <div className="flex justify-center items-center p-4">
      <input
        type="text"
        className="w-full bg-slate-300 rounded-xl text-black outline-none px-2 py-1 "
        value={message}
        onChange={handleSetMessage}
        onKeyDown={handleKeyPress}
      ></input>
      <div className="flex justify-center items-center m-6 w-6 h-6 p-4 bg-[#61a6f6] hover:bg-[#429bf5] rounded-md">
        <button
          className="relative rounded-full focus:outline-none "
          onClick={handleOnSubmitMessage}
        >
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 w-6 h-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-arrow-right"
            >
              <path d="M5 12H19" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default TextField;
