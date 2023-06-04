import React from 'react';
import useGetMessages from '@/app/hooks/useGetMessages';
import Loading from '@/app/Loading';
import Message from '../Message';

const GeneralChatView = () => {
  const { status, messages } = useGetMessages();

  if (status === 2) {
    return <Loading />;
  }

  return (
    <>
      {messages.map((message) => (
        <Message
          dataMessage={message}
          key={
            message.timestamp &&
            message.timestamp.toString() + message.metadata.uid
          }
        />
      ))}
    </>
  );
};

export default GeneralChatView;
