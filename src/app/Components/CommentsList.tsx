import React, { memo } from 'react'
import useGetMessages from '../hooks/useGetMessages'
import Loading from '../Loading'
import Message from './Message'
import { Status } from '../types/status'

const CommentsList = () => {
  const { status, messages } = useGetMessages()

  return (
    <>
      {status === Status.loading ? (
        <div className="flex-1 overflow-y-auto">
          <Loading />
        </div>
      ) : status === Status.success && messages.length ? (
        <div className="flex-1 overflow-y-auto mb-2">
          {messages.map(message => (
            <>
              <Message dataMessage={message} key={`${Math.random()}-${message.metadata.uid}`} />
            </>
          ))}
        </div>
      ) : null}
    </>
  )
}

export default memo(CommentsList)
