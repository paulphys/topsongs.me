import { RiMusic2Fill } from 'react-icons/ri';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

interface IProps {
  images: any;
  id: string;
  heading: string;
  subheading?: string;
  imageRounded?: boolean;
  type: string;
  artist: any;
}

export default function CardItem({
  images,
  id,
  heading,
  subheading = '',
  imageRounded = false,
  type,
  artist,
}: IProps) {
  const thumbnailRef = useRef<HTMLImageElement>();

  return (
    <>
      <div className="border-gray-100 dark:border-gray-800 mt-2 flex w-full max-w-3xl flex-row items-baseline border-b">
        <div className="mb-2 flex w-full items-start p-2">
          <p className="text-gray-400 dark:text-gray-600 mr-6 text-center text-sm font-bold">1.</p>
          <div className="min-w-max">
            <Image
              alt="Spotify"
              className="rounded-lg"
              height={70}
              width={70}
              src={images[0].url}
              quality={100}
            />
          </div>
          <div className="ml-3 flex flex-col items-start justify-center">
            <a
              className="text-gray-900 max-w-72 font-semibold dark:text-white "
              // href={item.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              {heading}
            </a>
            <p className="text-gray-500 dark:text-gray-300 max-w-48 w-48 truncate">
              {artist[0].name}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
