import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import AlbumList from '@/app/AlbumList';
import Heading from '@/app/Heading';
import TopTracks from '@/app/TopTracks';
import { getter } from '@/utils/getter';
import { getGreeting } from '@/utils/getGreeting';
import { isAuthenticated } from '@/utils/isAuthenticated';
import { signOut, useSession } from 'next-auth/react';
import { MdLogout, MdNavigateBefore, MdNavigateNext, MdArrowDropDown } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { MySession } from '@/types/types';
import Header from '@/app/Header';
import CollectionTabs from '@/app/CollectionTabs';
import { RiMusic2Fill } from 'react-icons/ri';
import { RiHome5Fill, RiHome5Line } from 'react-icons/ri';
import { IoSearchOutline } from 'react-icons/io5';
import { IoMdList } from 'react-icons/io';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from './Layout';
import { useSpotify } from '@/context/SpotifyContext';
//import useImageColor from 'use-image-color';
//import { Image } from 'use-image-color'


import Head from 'next/head';

interface UseSession {
  data: MySession | null;
}

export default function AppPage({}) {
  const activeLink = 'bg-[#282828] text-white';
  const inactiveLink = 'bg-transparent text-gray';
  const router = useRouter();
  const { data: session }: UseSession = useSession();
  const { playlists, fetchPlaylists } = useSpotify();

  useEffect(() => {
    fetchPlaylists();
  }, []);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  let greeting = session?.user?.name;

  if (greeting.length <= 8) {
    greeting = 'Hello ' + session?.user?.name;
  }
 //const { colors } = useImageColor(session?.user?.picture, { cors: true, colors: 2 });
  return (
    <>
      <Layout title="topsongs.me">
        <div className={`flex bg-[${colors}]`}>
          <div className="mt-8 ml-14 max-w-6xl">
            <div className="flex items-center justify-center gap-6">
              {session?.user?.picture === undefined ? (
                <AiOutlineUser className="rounded-full bg-[#333333] p-1 text-2xl" />
              ) : (
                <img
                  src={session?.user?.picture}
                  className="inline h-64 w-64 rounded-full object-contain"
                  alt={session?.user?.name}
                />
              )}
              <h1 className="mt-8 mb-4 ml-4 inline flex justify-center text-7xl font-bold">
                {session?.user?.name}{' '}
              </h1>
            </div>

            {/*<h1 className="flex mt-8 mb-4 text-5xl font-bold justify-center">{greeting} </h1> */}
            {/*<Heading text="Create Playlist" className="mt-14" />
          <TopTracks toptracks={toptracks.items}/>

          <div className="flex justify-center pt-8">
            <div className="transition duration-100 p-4 rounded cursor-pointer hover:bg-[#101010] border border-[#202020] hover:border-white w-96">
              <img
                src={session?.user?.picture}
                className={`object-cover w-24 h-24 rounded inline`}
              />

              <h2 className="ml-6 mt-5 text-xl font-semibold truncate inline ">Top Songs</h2>
              <div className="inline "></div>
            </div>
          </div>
          <div className="flex justify-center pt-6">
            <div className="transition duration-100 p-4 rounded cursor-pointer hover:bg-[#101010] border border-[#202020] hover:border-white w-96">
              <img
                src={session?.user?.picture}
                className={`object-cover w-24 h-24 rounded inline`}
              />

              <h2 className="ml-6 mt-5 text-xl font-semibold truncate inline mr-4">Liked Songs</h2>
              <h6 className="mt-5 text-sm font-semibold truncate inline text-gray ">X songs</h6>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <div className="transition duration-100 p-4 rounded cursor-pointer hover:bg-[#101010] border border-[#202020] hover:border-white w-96">
              <img
                src={session?.user?.picture}
                className={`object-cover w-24 h-24 rounded inline`}
              />

              <h3 className="ml-6 mt-5 font-semibold truncate inline mr-6 text-xl">Last Played</h3>
              <h6 className="mt-5 text-sm font-semibold truncate inline text-gray ">50 songs</h6>
            </div>
          </div>
          */}
          </div>
        </div>
      </Layout>
    </>
  );
}
