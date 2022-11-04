import Link from 'next/link';
import { Track } from '@/types/types';
import { IoHeart } from 'react-icons/io5';
import Image from 'next/image';

interface IProps {
  currentTrack: Track;
}

export default function PlayerTrackInfo({ currentTrack }: IProps) {
  return (
    <div className="col-span-3 flex items-center gap-3">
      {currentTrack.album && (
        <Image
          src={currentTrack.album.images?.[0].url}
          alt={currentTrack.name}
          className="h-14 w-14"
        />
      )}
      <div className="max-w-full">
        <h4 className="truncate text-sm">{currentTrack?.name}</h4>
        <Link href={`/artist/${currentTrack?.artists[0].id}`}>
          <a>
            <h5 className="text-xs text-gray">{currentTrack?.artists[0].name}</h5>
          </a>
        </Link>
      </div>
      <div>
        <IoHeart className="text-xl text-primary" />
      </div>
    </div>
  );
}
