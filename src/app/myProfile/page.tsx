'use client'
import React, { useMemo } from 'react'
import Image from 'next/image'
import { collection, limit, query, where } from 'firebase/firestore'
import { useFirestoreCollectionData } from 'reactfire'
import { useAuth } from '../hooks/useAuth'
import { IUser } from '../types/user'
import Link from 'next/link'

const MyProfile = () => {
  const { db, user, logout } = useAuth()

  const userQuery = useMemo(() => {
    if (user) {
      return query(collection(db, 'users'), where('uid', '==', user.uid))
    } else {
      return query(collection(db, 'users'), limit(1))
    }
  }, [db, user])
  const { status, data } = useFirestoreCollectionData<IUser>(userQuery as any)
  const userData = useMemo(
    () => (status === 'success' ? data[0] : ([] as unknown as IUser)),
    [data, status],
  )

  return (
    <>
      <div className="bg-[#1a1e25] relative h-screen bg-cover bg-center">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="absolute top-4 right-4">
            <button
              className="bg-[#61a6f6] hover:bg-[#429bf5] font-bold py-2 px-4 rounded-md"
              onClick={logout}
            >
              Logout
            </button>
          </div>
          <div className="absolute top-4 left-4">
            <Link href="/generalChat">
              <button className="bg-[#61a6f6] hover:bg-[#429bf5] font-bold py-2 px-4 rounded-md">
                Back to general chat
              </button>
            </Link>
          </div>
          {status === 'success' && (
            <>
              <Image
                height={200}
                width={200}
                className="w-50 h-50 rounded-full"
                src={userData?.photoURL || ''}
                alt="Profile"
              />
              <h1 className="mt-4 text-3xl font-bold text-white">{userData?.name}</h1>
              <p className="mt-2 text-lg text-white">{userData?.description}</p>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default MyProfile
