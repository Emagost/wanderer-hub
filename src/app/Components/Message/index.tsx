import { memo } from 'react';
// Types
import type IDataMessage from '@/app/types/message';

interface MessageProps {
  dataMessage: IDataMessage;
}

const FALLBACK_IMAGE_URL = 'https://random.imagecdn.app/500/150';

const Message = ({ dataMessage }: MessageProps) => {
  return (
    <div className="flex mt-3">
      <div className="flex items-end">
        <img
          className="w-10 h-10 rounded-full mr-3 "
          src={dataMessage.metadata.photoURL ?? FALLBACK_IMAGE_URL}
          alt={dataMessage.metadata.displayName ?? 'profile-img'}
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex items-center p-4 bg-gray-800 text-white rounded-lg">
        <div>
          <h3 className="text-base font-semibold">
            {dataMessage.metadata.displayName}
          </h3>
          <p className="text-sm">{dataMessage.message}</p>
        </div>
      </div>
    </div>
  );
};

export default memo(Message);
