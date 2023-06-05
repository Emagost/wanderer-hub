import React from 'react';
import useGetMessages from '@/app/hooks/useGetMessages';
import Loading from '@/app/Loading';
import Message from '../Message';
import { Status } from '@/app/types/status';

const GeneralChatView = () => {
  const { status, messages } = useGetMessages();

  return (
    <>
      {status === Status.loading ? (
        <Loading />
      ) : status === Status.success ? (
        <div className="flex-1 overflow-y-auto">
          {messages.map((message) => (
            <Message
              dataMessage={message}
              key={
                message.timestamp &&
                message.timestamp.toString() + message.metadata.uid
              }
            />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default GeneralChatView;
