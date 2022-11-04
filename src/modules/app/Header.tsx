import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { AiOutlineUser } from 'react-icons/ai';
import { MdLogout, MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { useSpotify } from '@/context/SpotifyContext';
import { MySession } from '@/types/types';
import CollectionTabs from './CollectionTabs';
import Image from 'next/image';
import SearchInput from './SearchInput';
import Link from 'next/link';
import { RiHome5Fill, RiHome5Line } from 'react-icons/ri';
import { IoSearchOutline } from 'react-icons/io5';
import { IoMdList } from 'react-icons/io';

interface UseSession {
  data: MySession | null;
}

const activeLink = 'bg-[#282828] text-white';
const inactiveLink = 'bg-transparent text-gray';

export default function Header() {
  const router = useRouter();
  const { data: session }: UseSession = useSession();
  const { setCurrentTrack } = useSpotify();

  const logout = () => {
    setCurrentTrack(null);
    signOut({ callbackUrl: '/' });
  };

  if (router.pathname === '/login') {
    return null;
  }

  return (
    <div className="sticky top-0 flex w-full justify-between bg-[#000] py-2 px-10">
      <svg
        width="45"
        height="45"
        viewBox="0 0 1600 1600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="items-center justify-center"
      >
        <circle cx="800.5" cy="800.5" r="688.5" fill="white" />
        <rect x="503" y="752" width="65" height="184" rx="32.5" fill="black" />
        <rect x="618" y="621" width="65" height="448" rx="32.5" fill="black" />
        <rect x="733" y="458" width="65" height="523" rx="32.5" fill="black" />
        <path
          d="M848 706.5C848 688.551 862.551 674 880.5 674V674C898.449 674 913 688.551 913 706.5V1036.5C913 1054.45 898.449 1069 880.5 1069V1069C862.551 1069 848 1054.45 848 1036.5V706.5Z"
          fill="black"
        />
        <rect x="963" y="601" width="65" height="395" rx="32.5" fill="black" />
        <rect x="1078" y="867" width="65" height="136" rx="32.5" fill="black" />
      </svg>
      <div className="flex hidden items-center">
        <div className="flex  w-full flex-row items-center">
          <Link href="/">
            <a>
              <div
                className={`${
                  router.pathname === '/' ? activeLink : inactiveLink
                } flex items-center gap-3 rounded p-2 text-sm`}
              >
                {router.pathname === '/' ? (
                  <RiHome5Fill className="text-2xl" />
                ) : (
                  <RiHome5Line className="text-2xl" />
                )}
                <span className="font-bold">Home</span>
              </div>
            </a>
          </Link>
          <Link href="/playlists">
            <a>
              <div
                className={`${
                  router.pathname.includes('/playlists') && !router.pathname.includes('tracks')
                    ? activeLink
                    : inactiveLink
                } flex cursor-pointer items-center gap-3 rounded p-2 text-sm  hover:text-white`}
              >
                <IoMdList className="text-2xl" />
                <span className="font-bold">Playlists</span>
              </div>
            </a>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Link href="/settings">
          <div className="flex cursor-pointer items-center gap-3 rounded-full bg-[#242424] bg-opacity-70 py-2 pl-2 pr-4 hover:bg-[#272727] ">
            {session?.user?.picture === undefined ? (
              <AiOutlineUser className="rounded-full bg-[#242424] p-1 text-2xl" />
            ) : (
              <img
                src={session?.user?.picture}
                className="h-8 w-8 rounded-full object-contain"
                alt={session?.user?.name}
              />
            )}
            <span className="text-sm font-bold tracking-wide">{session?.user?.name}</span>
          </div>
        </Link>

        <div>
          <button
            className="ml-4 flex h-12 w-12 cursor-pointer items-center items-center justify-center rounded-full bg-[#242424] bg-opacity-70 hover:bg-[#272727] focus:outline-none"
            onClick={logout}
            aria-label="Logout"
          >
            <MdLogout />
          </button>
        </div>
      </div>
    </div>
  );
}
