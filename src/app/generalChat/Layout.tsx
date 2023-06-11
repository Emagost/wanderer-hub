'use client';
import React, { Suspense } from 'react';
// Hooks
import { useAuth } from '../hooks/useAuth';
// Components
import Image from 'next/image';
import Loading from './Loading';
import Link from 'next/link';

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  const { logout, user } = useAuth();

  console.log('hola');
  return (
    <section className="h-screen flex flex-col">
      <nav className="bg-[#1a1e25]">
        <div className="flex justify-between items-center p-4">
          {user?.photoURL && (
            <Link href="/" as={'image'}>
              <Image
                className="ml-5 rounded-full w-14 h-14 "
                src={user?.photoURL}
                width={56}
                height={56}
                alt="User Avatar"
                style={{ border: '2px solid #61a6f6' }}
              />
            </Link>
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
