import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import AlbumList from '@/app/AlbumList';
import Heading from '@/app/Heading';
import Layout from '@/app/Layout';
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
import { useState } from 'react';

import Head from 'next/head';

interface UseSession {
  data: MySession | null;
}

export default function SettingsPage({}) {
  const router = useRouter();
  const { data: session }: UseSession = useSession();

  return (
    <>
      <Layout title="topsongs.me">
        <div className="flex h-full w-full items-center justify-center">
          <div className="mt-4 ml-4 max-w-6xl">
            <h1 className="mt-8 flex justify-center text-4xl font-bold">Settings</h1>
            <button
              className="mb-12 mt-12 flex cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-70 p-4 text-xl hover:bg-[#181818] focus:outline-none"
              aria-label="Delete my Account"
            >
              Delete account
            </button>
            <button
              className="flex cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-70 p-4 text-xl hover:bg-[#181818] focus:outline-none"
              aria-label=""
            >
              Cancel payments
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}
