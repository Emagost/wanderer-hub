'use client'
import React, { memo, useMemo, useState } from 'react'
import Image from 'next/image'
import { collection, query, where } from 'firebase/firestore'
import { useFirestoreCollectionData } from 'reactfire'
import Link from 'next/link'
import useAuth from '@/app/hooks/useAuth'
import { IUser } from '@/app/types/user'
import EditIcon from '@/app/Components/icons/EditIcon'

const UserProfile = ({ params }: { params: { uid: string } }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const { db, user } = useAuth()

  const userQuery = useMemo(
    () => query(collection(db, 'users'), where('uid', '==', params.uid)),
    [db, params.uid],
  )

  const { status, data } = useFirestoreCollectionData<IUser>(userQuery as any)

  const userData = useMemo(
    () => (status === 'success' ? data?.[0] : ([] as unknown as IUser)),
    [data, status],
  )

  const [description, setDescription] = useState<string>(userData?.description || '')
  const [userName, setUserName] = useState<string>(userData?.name || '')

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleEditDescription = (event: any) => {
    setDescription(event.target.value)
  }

  const handleEditUsername = (event: any) => {
    setUserName(event.target.value)
  }

  //   <button
  //     className="bg-buttonPrimary hover:bg-buttonPrimaryHover font-bold py-2 px-4 rounded-md"
  //     onClick={logout}
  //   >
  //     Logout
  //   </button>
  // </div>
  // <div className="absolute top-4 left-4">
  //   <Link href="/generalChat">
  //     <button className="bg-buttonPrimary hover:bg-buttonPrimaryHover font-bold py-2 px-4 rounded-md">
  //       Go back
  //     </button>
  //   </Link>
  // </div>
  //         <Image
  //           className="mb-3 rounded-full z-10"

  //         />

  return (
    <>
      {status === 'success' && user && (
        <main className="profile-page">
          <section className="relative block h-96">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')",
              }}
            >
              <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
              style={{ transform: 'translateZ(0px)' }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-gray-200 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </section>
          <section className="relative py-16 bg-blue-500-200">
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
                          className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          Connect
                        </button>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blue-600">
                            22
                          </span>
                          <span className="text-sm text-gray-400">Friends</span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blue-600">
                            10
                          </span>
                          <span className="text-sm text-gray-400">Photos</span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blue-600">
                            89
                          </span>
                          <span className="text-sm text-gray-400">Comments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-700">
                      Jenna Stones
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-gray-400 font-bold uppercase">
                      <i className="mr-2 text-lg text-gray-400"></i>
                      Los Angeles, California
                    </div>
                    <div className="mb-2 text-gray-600 mt-10">
                      <i className="mr-2 text-lg text-gray-400"></i>Solution Manager - Creative Tim
                      Officer
                    </div>
                    <div className="mb-2 text-gray-600">
                      <i className="mr-2 text-lg text-gray-400"></i>University of Computer Science
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t border-gray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-gray-700">
                          An artist of considerable range, Jenna the name taken by Melbourne-raised,
                          Brooklyn-based Nick Murphy writes, performs and records all of his own
                          music, giving it a warm, intimate feel with a solid groove structure. An
                          artist of considerable range.
                        </p>
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
