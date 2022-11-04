import React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Layout from '@/app/Layout';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const LandingPage = ({}) => {
  const handleLogin = () => {
    signIn('spotify', { callbackUrl: process.env.REDIRECT_URI });
  };
  return (
    <>
      <div className="py-8">
        <a
          onClick={handleLogin}
          className="mt-3 w-full cursor-pointer items-center rounded-md border border-transparent bg-primary px-6 py-3 text-xl font-semibold text-white shadow-sm hover:bg-black hover:text-white focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
        >
          Sign in with Spotify
        </a>
      </div>
    </>
  );
};
