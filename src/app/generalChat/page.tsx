'use client';
import { Suspense } from 'react';
// Hooks
import { useAuth } from '../hooks/useAuth';
// Components
import TextField from '../Components/TextField';
import CommentsList from '../Components/Chat/CommentsList';
import Loading from './Loading';

const GeneralChat = () => {
  const { logout, user } = useAuth();

  return (
    <>
      {user != null && (
        <>
          <section className="h-screen flex flex-col">
            <nav className="bg-[#1a1e25]">
              <div className="flex justify-between items-center p-4">
                {user?.photoURL && (
                  <img
                    className="ml-5 rounded-full w-14 h-14 "
                    src={user?.photoURL}
                    alt="User Avatar"
                    style={{ border: '2px solid #61a6f6' }}
                  />
                )}
                <h1 className="text-4xl font-bold text-white">WandererHub</h1>
                <button
                  className="bg-[#61a6f6] hover:bg-[#429bf5] font-bold py-2 px-4 rounded-md"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
              <hr className="border-t border-[#61a6f6]" />
            </nav>
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
          </section>
        </>
      )}
    </>
  );
};

export default GeneralChat;
