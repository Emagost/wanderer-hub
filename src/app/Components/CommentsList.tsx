import React, { memo } from 'react'
import Message from './Message'
import IDataMessage from '../types/message'

const CommentsList = ({ messages }: { messages: IDataMessage[] }) => {
  return (
    <div className="flex-1 overflow-y-auto mb-2">
      {messages.map(message => (
        <Message dataMessage={message} key={`${Math.random()}-${message.metadata.uid}`} />
      ))}
    </div>
  )
}

export default memo(CommentsList)
