'use client';
// Hooks
import { useAuth } from '../hooks/useAuth';
// Components
import TextField from '../Components/TextField/TextField';
import GeneralChatView from '../Components/Chat/Chat';
import { Suspense } from 'react';
import Loading from './Loading';

const GeneralChat = () => {
  const { user } = useAuth();

  return (
    <>
      {user != null && (
        <div className="h-screen bg-gray-900 flex items-center justify-center">
          <div className="w-5/6 rounded-lg border-2 border-gray-800 h-full">
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto">
                <Suspense fallback={<Loading />}>
                  <GeneralChatView />
                </Suspense>
              </div>
              <TextField user={user} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GeneralChat;
