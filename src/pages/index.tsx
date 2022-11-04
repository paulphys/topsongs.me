import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import { useSession, signIn } from 'next-auth/react';
import { MySession } from '@/types/types';
import { LandingPage } from '@/landing/LandingPage';
import AppPage from '@/app/AppPage';
import { getter } from '@/utils/getter';
import { isAuthenticated } from '@/utils/isAuthenticated';
import { useEffect } from 'react';

interface UseSession {
  data: MySession | null;
  status: any;
}

export default function Home({ toptracks }) {
  const { data: session, status }: UseSession = useSession();
  console.log(session);
  const handleLogin = () => {
    signIn('spotify', { callbackUrl: process.env.REDIRECT_URI });
  };
  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn('spotify', { callbackUrl: process.env.REDIRECT_URI });
    }
  }, [session]);
  if (status === 'loading') {
    return <div className="h-screen w-screen bg-[#000]"></div>;
  }
  if (session || status === 'authenticated') {
    return <AppPage />;
  }
  if (session?.error || !session || status === 'unauthenticated') {
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
  }
}
