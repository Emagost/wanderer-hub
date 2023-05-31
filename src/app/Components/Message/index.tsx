import { memo } from 'react';
//Firebase
import { User } from 'firebase/auth';

interface MessageProps {
  user: User | null;
}

const Message = ({ user }: MessageProps) => {
  return (
    <>
      {user && (
        <div className="flex justify-center align-middle">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={user.photoURL || 'https://random.imagecdn.app/500/150'}
            alt={user.displayName || 'noImageIcon'}
          />
          <p>{user.displayName}</p>
        </div>
      )}
    </>
  );
};

export default memo(Message);
