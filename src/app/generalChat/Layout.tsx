'use client';
import React, { Suspense } from 'react';
// Hooks
import { useAuth } from '../hooks/useAuth';
// Components
import Loading from './Loading';

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  const { logout, user } = useAuth();

  console.log('hola');
  return (
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
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </section>
  );
};

export default GeneralLayout;
