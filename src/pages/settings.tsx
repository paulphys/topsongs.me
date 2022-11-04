import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { MySession } from '@/types/types';
import { LandingPage } from '@/landing/LandingPage';
import AppPage from '@/app/AppPage';
import { getter } from '@/utils/getter';
import { isAuthenticated } from '@/utils/isAuthenticated';
import SettingsPage from '@/app/SettingsPage';

interface UseSession {
  data: MySession | null;
  status: any;
}

export default function Settings() {
  const { data: session, status }: UseSession = useSession();
  if (status === 'loading') {
    return <div className="h-screen w-screen bg-[#121212]"></div>;
  }
  if (session) {
    return <SettingsPage />;
  } else {
    return <LandingPage />;
  }
}
