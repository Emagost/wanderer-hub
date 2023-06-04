'use client';
// Hooks
import { useAuth } from '../hooks/useAuth';
// Components
import TextField from '../Components/TextField/TextField';
import GeneralChatView from '../Components/Chat/Chat';

const GeneralChat = () => {
  const { user } = useAuth();

  return (
    <>
      {user != null && (
        <div className="min-h-screen bg-gray-900 flex">
          <div className="flex items-center justify-center h-screen ">
            <div className="w-5/6 h-5/6  rounded-lg border-2 border-gray-800">
              <div className="flex items-center justify-center">
                <GeneralChatView />
                <TextField user={user} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GeneralChat;
