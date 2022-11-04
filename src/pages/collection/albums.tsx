import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import AlbumList from '@/app/AlbumList';
import Heading from '@/app/Heading';
import Layout from '@/app/Layout';
import { Album } from '@/types/types';
import { getter } from '@/utils/getter';
import { isAuthenticated } from '@/utils/isAuthenticated';

interface IProps {
  albums: Album[];
}

export default function Albums({ albums }: IProps) {
  return (
    <Layout title="Spotify - Your Library">
      <Heading text="Albums" />
      <AlbumList albums={albums} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (!(await isAuthenticated(session))) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const { items } = await getter(
    `https://api.spotify.com/v1/me/albums?market=from_token&limit=50`,
    session
  );

  return { props: { albums: items.map((item) => item.album) } };
};
