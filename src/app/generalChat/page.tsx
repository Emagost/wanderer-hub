'use client';
//Hooks
import { useAuth } from '../hooks/useAuth';
//Components
import Message from '../Components/Message';

const generalChat = () => {
  const { user, logout } = useAuth();
  return (
    <div className="relative h-screen bg-gray-900">
      <button
        className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>
      <div className="flex flex-col items-center justify-center h-full">
        <Message user={user} />
      </div>
    </div>
  );
};

export default generalChat;
