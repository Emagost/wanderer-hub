'use client'
import React, { useMemo } from 'react'
import Image from 'next/image'
import { collection, limit, query, where } from 'firebase/firestore'
import { useFirestoreCollectionData } from 'reactfire'
import { useAuth } from '../hooks/useAuth'
import { IUser } from '../types/user'
import Link from 'next/link'
import EditIcon from '../Components/icons/EditIcon'

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
    () => (status === 'success' ? data?.[0] : ([] as unknown as IUser)),
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
            <div className="w-full flex justify-center items-center">
              <div className="w-full">
                <hr className="border-t border-white w-full mt-4 mb-14" />
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Image
                    height={200}
                    width={200}
                    className="w-50 h-50 rounded-full "
                    src={userData?.photoURL || ''}
                    alt="Profile image"
                  />
                </div>
                <div className="w-200 h-300 border-2 border-gray-300 flex flex-col items-center justify-center">
                  <div className="mt-10">
                    <div className="flex">
                      <h2 className="text-center">{userData.name}</h2>
                      <button className="ml-4 ">
                        <EditIcon />
                      </button>
                    </div>
                    <p className="text-center" contentEditable>
                      {userData?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default MyProfile
