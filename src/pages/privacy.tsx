import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { MySession } from '@/types/types';
import { LandingPage } from '@/landing/LandingPage';
import AppPage from '@/app/AppPage';
import { getter } from '@/utils/getter';
import { isAuthenticated } from '@/utils/isAuthenticated';

export default function Privacy() {
  return (
    <>
      <h1>privacy policy</h1>
    </>
  );
}
