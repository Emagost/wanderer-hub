'use client';
import React, { Suspense } from 'react';
import { useAuth } from '../hooks/useAuth';
import Loading from './Loading';

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  const { logout, user } = useAuth();

  console.log('hola');
  return (
    <section>
      <nav>
        <div className="flex h-3">
          <img className="rounded-md" src={user?.photoURL ?? undefined}></img>
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">WandererHub</h1>
          </div>
          <button
            className="absolute top-4 right-4 bg-[#61a6f6] hover:bg-[#429bf5] font-bold py-2 px-4 rounded-full"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </nav>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </section>
  );
};

export default GeneralLayout;
