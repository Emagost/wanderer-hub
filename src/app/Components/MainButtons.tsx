import useAuth from '../hooks/useAuth'
import { memo } from 'react'
import Link from 'next/link'

const MainButtons = ({ href }: { href: string }) => {
  const { logout } = useAuth()

  return (
    <div>
      <div className="relative z-10">
        <button
          className="bg-buttonPrimary hover:bg-buttonPrimaryHover absolute top-5 right-5 font-bold py-2 px-4 rounded-md"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <div className="relative z-10">
        <Link href={`/${href}`}>
          <button className="bg-buttonPrimary hover:bg-buttonPrimaryHover absolute top-5 left-5 font-bold py-2 px-4 rounded-md">
            Go back
          </button>
        </Link>
      </div>
    </div>
  )
}

export default memo(MainButtons)
