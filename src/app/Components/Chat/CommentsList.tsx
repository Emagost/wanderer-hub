import React from 'react';
import useGetMessages from '../../hooks/useGetMessages';
import Loading from '../../Loading';
import Message from '../Message';
import { Status } from '../../types/status';

const CommentsList = () => {
  const { status, messages } = useGetMessages();

  return (
    <>
      {status === Status.loading ? (
        <Loading />
      ) : status === Status.success ? (
        <div className="flex-1 overflow-y-auto">
          {messages.map((message) => (
            <>
              <Message
                dataMessage={message}
                key={`${Math.random()}-${message.metadata.uid}`}
              />
            </>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default CommentsList;
