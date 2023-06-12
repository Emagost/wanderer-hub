import { useState, useEffect, useCallback } from 'react';
// Route
import { useRouter, usePathname } from 'next/navigation';
// Firebase
import { doc, setDoc, getDoc } from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  type User,
} from 'firebase/auth';
import { db } from '../../../firebase';

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const signInWithGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);

      const { displayName, email, uid, photoURL, metadata } = result.user;
      const { lastSignInTime, creationTime } = metadata;

      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        await setDoc(
          userRef,
          {
            metadata: {
              lastSignInTime,
            },
          },
          { merge: true }
        );
      } else {
        await setDoc(userRef, {
          name: displayName,
          email,
          uid,
          photoURL,
          metadata: {
            lastSignInTime,
            creationTime,
          },
        });
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user != null) {
        setUser(user);
      } else {
        setUser(null);
      }

      if (user === null && pathname !== '/login') {
        router.push('/login');
      } else if (user != null && pathname === '/login') {
        router.push('/generalChat');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [pathname, router]);

  const logout = useCallback(async () => {
    await auth
      .signOut()
      .then(() => {
        router.push('/login');
      })
      .catch((error) => {
        console.error('Error logout:', error);
      });
  }, [router]);

  return { user, signInWithGoogle, logout };
};
