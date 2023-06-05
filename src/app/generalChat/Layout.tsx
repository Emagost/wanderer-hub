'use client';
import React, { Suspense } from 'react';
import { useAuth } from '../hooks/useAuth';
import Loading from './Loading';

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useAuth();

  return (
    <section>
      <nav>
        <button
          className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={logout}
        >
          Logout
        </button>
      </nav>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </section>
  );
};

export default GeneralLayout;
