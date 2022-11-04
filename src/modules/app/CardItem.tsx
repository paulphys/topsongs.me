import { RiMusic2Fill } from 'react-icons/ri';
import Image from 'next/image';

import Link from 'next/link';
import { useRef } from 'react';

interface IProps {
  images: any;
  id: string;
  altTitle: string;
  heading: string;
  subheading?: string;
  imageRounded?: boolean;
  type: string;
}

export default function CardItem({
  images,
  id,
  altTitle,
  heading,
  subheading = '',
  imageRounded = false,
  type,
}: IProps) {
  const thumbnailRef = useRef<HTMLImageElement>();

  return (
    <Link href={`/${type}/${id}`} passHref>
      <div className="cursor-pointer rounded-md bg-paper p-4 transition duration-300 hover:bg-[#282828]">
        {images.length > 0 ? (
          <img
            src={images[0].url}
            alt={altTitle}
            className={`h-36 w-36 object-cover  ${imageRounded ? 'rounded-full' : 'rounded'}`}
          />
        ) : (
          <div className="h-40 w-full">
            <RiMusic2Fill className="h-full w-full bg-paper " />
          </div>
        )}
        <h3 className="mt-5 truncate font-bold">{heading}</h3>
        {subheading && <h6 className="truncate text-sm text-gray">{subheading}</h6>}
      </div>
    </Link>
  );
}
