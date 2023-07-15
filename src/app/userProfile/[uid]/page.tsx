'use client'
import React, { memo, useMemo, useState } from 'react'
import Image from 'next/image'
import { collection, query, where } from 'firebase/firestore'
import { useFirestoreCollectionData } from 'reactfire'
import useAuth from '@/app/hooks/useAuth'
import { IUser } from '@/app/types/user'
import EditIcon from '@/app/Components/icons/EditIcon'
import MainButtons from '@/app/Components/MainButtons'
import TextareaAutosize from 'react-textarea-autosize'

const UserProfile = ({ params }: { params: { uid: string } }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const { db, user } = useAuth()
  const userQuery = useMemo(
    () => query(collection(db, 'users'), where('uid', '==', params.uid)),
    [db, params.uid],
  )

  const { status, data } = useFirestoreCollectionData<IUser>(userQuery as any)

  const userData = useMemo(() => (status === 'success' ? data?.[0] : undefined), [data, status])

  const [description, setDescription] = useState<string>(userData?.description || '')
  const [userName, setUserName] = useState<string>(userData?.name || '')
  const [location, setLocation] = useState<string>(userData?.location || '')

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

  return (
    <>
      {status === 'success' && !!userData && !!user && (
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
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <button
                          className="bg-pink-500 hover:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          Connect
                        </button>
                        {user.uid === params.uid && (
                          <button onClick={handleEdit} className="color-black bg-black">
                            <EditIcon />
                          </button>
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
                          className={`mr-2 text-lg ${!location ? 'border-2 border-blue-600' : ''}`}
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
                              !description && 'border-2 border-blue-600'
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
            </div>
          </section>
        </main>
      )}
    </>
  )
}

export default memo(UserProfile)
