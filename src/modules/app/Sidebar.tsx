import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSpotify } from '@/context/SpotifyContext';
import { RiHome5Fill, RiHome5Line, RiBookmarkLine, RiBookmarkFill } from 'react-icons/ri';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { IoSearchOutline } from 'react-icons/io5';
import { IoMdList } from 'react-icons/io';

const activeLink = 'bg-[#151515] text-white';
const inactiveLink = 'bg-transparent text-gray';

export default function Sidebar() {
  const router = useRouter();

  const { playlists, fetchPlaylists } = useSpotify();

  if (router.pathname === '/login') {
    return null;
  }

  return (
    <aside className="fixed top-24 left-3 h-full w-64 rounded-lg bg-[#151515]">
      <div className="ml-5 mr-5 mt-5 flex h-full flex-col items-center">
        <ul className="w-full">
          <Link href="/">
            <a>
              <li
                className={`${
                  router.pathname === '/' ? activeLink : inactiveLink
                } flex items-center gap-4 rounded p-2 text-sm`}
              >
                {router.pathname === '/' ? (
                  <RiHome5Fill className="text-xl" />
                ) : (
                  <RiHome5Line className="text-xl" />
                )}
                <span className="font-semibold">Home</span>
              </li>
            </a>
          </Link>

          <Link href="/">
            <a>
              <li
                className={`${
                  router.pathname === '/create' ? activeLink : inactiveLink
                } flex cursor-pointer items-center gap-4 rounded p-2 py-3  text-sm hover:text-white`}
              >
                <BsFillPlusSquareFill className="text-xl" />

                <span className="font-semibold ">Create Playlist</span>
              </li>
            </a>
          </Link>

          <Link href="/playlists">
            <a>
              <li
                className={`${
                  router.pathname.includes('/playlists') && !router.pathname.includes('tracks')
                    ? activeLink
                    : inactiveLink
                } flex cursor-pointer items-center gap-4 rounded p-2 text-sm  hover:text-white`}
              >
                {router.pathname === '/playlists' ? (
                  <RiBookmarkFill className="text-xl" />
                ) : (
                  <RiBookmarkLine className="text-xl" />
                )}

                <span className="font-semibold">Your Library</span>
              </li>
            </a>
          </Link>

          <Link href="/collection/tracks">
            <a>
              <li
                className={`${
                  router.pathname === '/collection/tracks' ? 'text-white' : 'text-gray'
                } flex cursor-pointer items-center gap-4 rounded p-2 py-3  text-sm hover:text-white`}
              >
                <Image
                  src="/images/liked_cover.jpeg"
                  height={20}
                  width={20}
                  objectFit="contain"
                  className="rounded"
                  alt="Liked playlist cover"
                />
                <span className="font-semibold">Liked songs</span>
              </li>
            </a>
          </Link>
        </ul>

        <div className="mt-4 h-px w-full bg-[#404040]"></div>

        <ul
          id="sidebar-playlists"
          className="mt-5 flex w-full flex-col gap-3 overflow-x-hidden pr-3 text-xs text-gray"
        >
          {playlists?.map((playlist) => (
            <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
              <a className="w-full cursor-pointer">
                <li
                  key={playlist.id}
                  className="cursor-default cursor-pointer truncate text-xs font-medium hover:text-white"
                >
                  {playlist.name}
                </li>
              </a>
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  );
}
