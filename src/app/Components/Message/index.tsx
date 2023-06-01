import { memo } from 'react';
//Firebase
import { User } from 'firebase/auth';

interface MessageProps {
  user: User | null;
}

const FALLBACK_IMAGE_URL = 'https://random.imagecdn.app/500/150';

const Message = ({ user }: MessageProps) => {
  return (
    <>
      {user && (
        <div className="flex items-center p-4 bg-gray-700 text-white rounded-xl">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={user.photoURL || FALLBACK_IMAGE_URL}
            alt={user.displayName || 'profile-img'}
            referrerPolicy="no-referrer"
          />
          <div>
            <h3 className="text-lg font-semibold">{user.displayName}</h3>
            {/* Here is the message from user */}
            <p className="text-sm">Active</p>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(Message);
