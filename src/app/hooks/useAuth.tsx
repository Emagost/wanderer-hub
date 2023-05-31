import { useState, useEffect } from 'react';
//Route
import { useRouter, usePathname } from 'next/navigation';
//Firebase
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from 'firebase/auth';
import firebase from 'firebase/compat/app';
import firebaseConfig from '../../../firebaseConfig';

// Inicializa la app de Firebase
firebase.initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user && pathname === '/login') {
      router.push('/generalChat');
    }
  }, [user, pathname, router]);

  const logout = async () => {
    await auth
      .signOut()
      .then(() => {
        router.push('/login');
      })
      .catch((error) => {
        console.error('Error logout:', error);
      });
  };

  console.log(user);

  return { user, signInWithGoogle, logout };
};
