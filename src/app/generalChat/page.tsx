'use client';
//Hooks
import { useAuth } from '../hooks/useAuth';
//Components
import TextField from '../Components/TextField/TextField';

const generalChat = () => {
  const { logout } = useAuth();
  return (
    <div className="min-h-screen bg-gray-900 flex">
      <button
        className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>
      <div className="flex items-center justify-center h-screen ">
        <div className="w-5/6 h-5/6  rounded-lg border-2 border-gray-800">
          <div className="flex items-center justify-center">
            <TextField />
          </div>
        </div>
      </div>
    </div>
  );
};

export default generalChat;
