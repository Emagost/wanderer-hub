import { memo } from 'react';
// Types
import type IDataMessage from '@/app/types/message';

interface MessageProps {
  dataMessage: IDataMessage;
}

const FALLBACK_IMAGE_URL = 'https://random.imagecdn.app/500/150';

const Message = ({ dataMessage }: MessageProps) => {
  return (
    <div className="flex items-center p-4 bg-gray-700 text-white rounded-xl">
      <img
        className="w-10 h-10 rounded-full mr-4"
        src={dataMessage.metadata.photoURL ?? FALLBACK_IMAGE_URL}
        alt={dataMessage.metadata.displayName ?? 'profile-img'}
        referrerPolicy="no-referrer"
      />
      <div>
        <h3 className="text-lg font-semibold">
          {dataMessage.metadata.displayName}
        </h3>
        {/* Here is the message from user */}
        <p className="text-sm">{dataMessage.message}</p>
      </div>
    </div>
  );
};

export default memo(Message);
