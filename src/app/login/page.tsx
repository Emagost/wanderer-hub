'use client';
import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();

  useEffect(() => {
    if (user != null) {
      router.push('/generalChat');
    }
  }, [user, router]);

  const handleGoogleLogin = useCallback(async () => {
    await signInWithGoogle();
    router.push('/generalChat');
  }, [router, signInWithGoogle]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <h1 className="text-4xl font-bold text-white mb-4">
        Welcome to WandererHub
      </h1>
      <p className="text-white text-center mb-8">
        Discover amazing destinations and connect with fellow travelers.
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleGoogleLogin}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
