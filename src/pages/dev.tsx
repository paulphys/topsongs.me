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
import { MdLogout, MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { MySession } from '@/types/types';

interface UseSession {
  data: MySession | null;
}

export default function Home({ toptracks }) {
  const { data: session }: UseSession = useSession();

  return (
    <>
      <Layout title="Spotify.top">
        <h1 className="mb-5 text-3xl font-bold">Good {getGreeting()}</h1>
        <div className="flex items-center gap-6">
          {session?.user?.picture === undefined ? (
            <AiOutlineUser className="rounded-full bg-[#333333] p-1 text-2xl" />
          ) : (
            <img
              src={session?.user?.picture}
              className="h-20 w-20 rounded-full object-contain"
              alt={session?.user?.name}
            />
          )}
          <span className="text-m font-bold tracking-wide">{session?.user?.name}</span>
        </div>
        <Heading text="Top Tracks" className="mt-10" />
        <TopTracks toptracks={toptracks.items} />
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!(await isAuthenticated(session))) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const toptracks = await getter(
    'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term',
    session
  );

  return { props: { toptracks } };
};
