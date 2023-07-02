'use client'
// Hooks
import { useAuth } from '../hooks/useAuth'
// Components
import TextField from '../Components/TextField'
import CommentsList from '../Components/CommentsList'
import Image from 'next/image'
import Link from 'next/link'

const GeneralChat = () => {
  const { logout, user } = useAuth()

  return (
    <>
      {user != null && (
        <>
          <section className="h-screen flex flex-col">
            <nav className="bg-primary">
              <div className="flex justify-between items-center p-4">
                <Link href="/myProfile">
                  {user?.photoURL && (
                    <Image
                      className="ml-5 rounded-full w-14 h-14 "
                      src={user?.photoURL}
                      alt="User Avatar"
                      width={56}
                      height={56}
                      style={{ border: '2px solid #61a6f6' }}
                    />
                  )}
                </Link>
                <h1 className="text-4xl font-bold text-white">WandererHub</h1>
                <button
                  className="bg-buttonPrimary hover:bg-buttonPrimaryHover font-bold py-2 px-4 rounded-md"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
              <hr className="border-t border-bubg-buttonPrimary" />
            </nav>
            <div className="flex-grow bg-primary flex items-center justify-center h-5/6">
              <div className="w-5/6 rounded-lg border-2 border-gray-800 h-5/6">
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto ml-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                    <CommentsList />
                  </div>
                  <TextField user={user} />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  )
}

export default GeneralChat
