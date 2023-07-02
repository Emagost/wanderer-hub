'use client'
import React, { memo, useMemo } from 'react'
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
      <div className="bg-primary relative h-screen bg-cover bg-center">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="absolute top-4 right-4">
            <button
              className="bg-buttonPrimary hover:bg-buttonPrimaryHover font-bold py-2 px-4 rounded-md"
              onClick={logout}
            >
              Logout
            </button>
          </div>
          <div className="absolute top-4 left-4">
            <Link href="/generalChat">
              <button className="bg-buttonPrimary hover:bg-buttonPrimaryHover font-bold py-2 px-4 rounded-md">
                Back to general chat
              </button>
            </Link>
          </div>
          {status === 'success' && (
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-end px-4 pt-4">
                <button
                  id="dropdownButton"
                  data-dropdown-toggle="dropdown"
                  className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                  type="button"
                >
                  <EditIcon />
                </button>
              </div>
              <div className="flex flex-col items-center pb-10">
                <Image
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src={userData?.photoURL}
                  alt="Bonnie image"
                  width={96}
                  height={96}
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  {userData?.name}
                </h5>
                <div className="w-4/5">
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    {userData?.description}
                  </p>
                </div>
                <div className="flex mt-4 space-x-3 md:mt-6">
                  <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add friend
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default memo(MyProfile)
