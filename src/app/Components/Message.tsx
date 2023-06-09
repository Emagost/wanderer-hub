import { memo } from 'react'
// Types
import type IDataMessage from '@/app/types/message'
import Image from 'next/image'
import Link from 'next/link'

interface MessageProps {
  dataMessage: IDataMessage
}

const Message = ({ dataMessage }: MessageProps) => {
  return (
    <div className="flex mt-3">
      <div className="flex items-end">
        <Link href={`/userProfile/${dataMessage.metadata.uid}`}>
          <Image
            height={40}
            width={40}
            className="w-10 h-10 rounded-full mr-3 border-2 border-solid border-Primary"
            src={dataMessage.metadata.photoURL}
            alt={dataMessage.metadata.displayName ?? 'profile-img'}
            referrerPolicy="no-referrer"
          />
        </Link>
      </div>
      <div className="flex items-center p-4 bg-gray-800 text-white rounded-lg">
        <div>
          <h3 className="text-base font-semibold">{dataMessage.metadata.displayName}</h3>
          <p className="text-sm">{dataMessage.message}</p>
        </div>
      </div>
    </div>
  )
}

export default memo(Message)
