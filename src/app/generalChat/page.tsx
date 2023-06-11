'use client';
import { Suspense } from 'react';
// Hooks
import { useAuth } from '../hooks/useAuth';
// Components
import TextField from '../Components/TextField';
import CommentsList from '../Components/Chat/CommentsList';
import Loading from './Loading';

const GeneralChat = () => {
  const { user } = useAuth();

  return (
    <>
      {user != null && (
        <div className="flex-grow bg-[#1a1e25] flex items-center justify-center">
          <div className="w-5/6 rounded-lg border-2 border-gray-800 h-5/6">
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto ml-2">
                <Suspense fallback={<Loading />}>
                  <CommentsList />
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
