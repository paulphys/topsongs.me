import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { MySession } from '@/types/types';
import { LandingPage } from '@/landing/LandingPage';
import AppPage from '@/app/AppPage';
import { getter } from '@/utils/getter';
import { isAuthenticated } from '@/utils/isAuthenticated';

export default function Permissions() {
  return (
    <>
      <h1>Permissions</h1>
      For more information, please see the Spotify Docs.
    </>
  );
}

// https://developer.spotify.com/documentation/general/guides/authorization/scopes/
