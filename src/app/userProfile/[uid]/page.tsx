'use client'
import React, { memo, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { collection, doc, query, setDoc, where } from 'firebase/firestore'
import { useFirestoreCollectionData } from 'reactfire'
import useAuth from '@/app/hooks/useAuth'
import { IUser } from '@/app/types/user'
import MainButtons from '@/app/Components/MainButtons'
import TextareaAutosize from 'react-textarea-autosize'

const UserProfile = ({ params }: { params: { uid: string } }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [userData, setUserData] = useState<IUser | undefined>(undefined)
  const [description, setDescription] = useState<string>('')
  const [userName, setUserName] = useState<string>('')
  const [location, setLocation] = useState<string>('')

  const { db, user } = useAuth()
  const userQuery = useMemo(
    () => query(collection(db, 'users'), where('uid', '==', params.uid)),
    [db, params.uid],
  )

  const { status, data } = useFirestoreCollectionData<IUser>(userQuery as any)

  useEffect(() => {
    if (status === 'success') {
      const user = data?.[0]
      if (user) {
        setUserData(user)
        setDescription(user.description || '')
        setUserName(user.name || '')
        setLocation(user.location || '')
        setIsLoaded(true)
      }
    } else {
      setIsLoaded(false)
    }
  }, [data, status])

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleEditDescription = (event: any) => {
    setDescription(event.target.value)
  }

  const handleEditUsername = (event: any) => {
    setUserName(event.target.value)
  }

  const handleEditLocation = (event: any) => {
    setLocation(event.target.value)
  }

  const handleSubmit = () => {
    const refUser = doc(db, `users/${user?.uid}`)
    setDoc(
      refUser,
      {
        description: description,
        name: userName,
        location: location,
      },
      { merge: true },
    ).then(() => {
      setIsEditing(false)
    })
  }

  return (
    <>
      {isLoaded && !!user && !!userData && (
        <main className="h-screen w-screen">
          <section className="relative block h-1/3">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')",
              }}
            >
              <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
            </div>
            <MainButtons href="generalChat" />
          </section>
          <section className="relative py-16 bg-primary h-4/6 max-h-4/6">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <Image
                          height={150}
                          width={150}
                          alt="user image"
                          src={userData?.photoURL}
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0 flex items-center justify-end">
                        <button
                          className="bg-pink-500 hover:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          Connect
                        </button>
                        {user.uid === params.uid && (
                          <div className="mb-1">
                            {isEditing ? (
                              <button
                                onClick={handleSubmit}
                                className="flex p-2 bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 fill-white"
                                  viewBox="0 0 448 512"
                                  stroke="currentColor"
                                >
                                  <path d="M48 96V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V170.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H309.5c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8V184c0 13.3-10.7 24-24 24H104c-13.3 0-24-10.7-24-24V80H64c-8.8 0-16 7.2-16 16zm80-16v80H272V80H128zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z" />
                                </svg>
                              </button>
                            ) : (
                              <button
                                onClick={handleEdit}
                                className="flex p-2 bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blue-600">
                            {userData?.friends?.length ?? 0}
                          </span>
                          <span className="text-sm text-gray-400">Friends</span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blue-600">
                            {userData?.travels?.length ?? 0}
                          </span>
                          <span className="text-sm text-gray-400">Travels</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    {isEditing ? (
                      <input
                        type="text"
                        onChange={handleEditUsername}
                        value={userName}
                        className="text-4xl font-semibold leading-normal mb-2 text-gray-700 text-center"
                      />
                    ) : (
                      <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-700">
                        {userName}
                      </h3>
                    )}
                    <div className="text-sm leading-normal mt-0 mb-2 text-gray-400 font-bold uppercase">
                      {isEditing ? (
                        <input
                          type="text"
                          onChange={handleEditLocation}
                          value={location}
                          className={`mr-2 text-lg text-gray-700 ${
                            !location ? 'border-2 border-blue-600' : ''
                          }`}
                        />
                      ) : (
                        <>
                          <i className="mr-2 text-lg text-gray-400"></i>
                          {location
                            ? location
                            : user.uid === params.uid &&
                              'You can add your location editing your profile...'}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        {isEditing ? (
                          <TextareaAutosize
                            onChange={handleEditDescription}
                            value={description}
                            className={`mb-4 text-lg leading-relaxed text-gray-700 w-full text-center resize-none max-h-64 ${
                              !description ? 'border-2 border-blue-600' : ''
                            }`}
                          />
                        ) : (
                          <p className="mb-4 text-lg leading-relaxed text-gray-700 max-h-64 overflow-y-scroll">
                            {description
                              ? description
                              : user.uid === params.uid &&
                                'You can add a description editing your profile...'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Travels */}
              <section className="flex flex-col items-center bg-white w-full">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-700 mt-8">
                  Next Travels
                </h3>
                <hr className="w-full border-t border-gray-300 my-4" />
                <div className="flex items-start m-3 p-3 space-x-4 rounded-lg shadow-md w-full bg-gray-200">
                  <Image
                    height={150}
                    width={150}
                    alt="travel image"
                    src={userData?.photoURL}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700">{'Testing'}</h2>
                    <p className="text-gray-600">{'Testing more travels'}</p>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </main>
      )}
    </>
  )
}

export default memo(UserProfile)
