import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import ArtistList from '@/app/ArtistList';
import Heading from '@/app/Heading';
import Layout from '@/app/Layout';
import { Artist } from '@/types/types';
import { getter } from '@/utils/getter';
import { isAuthenticated } from '@/utils/isAuthenticated';

interface IProps {
  followedArtists: Artist[];
}

export default function FollowedArtists({ followedArtists }: IProps) {
  return (
    <Layout title="Spotify - Your Library">
      <Heading text="Artists" />
      <ArtistList artists={followedArtists} />
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

  const followedArtists = await getter(
    `https://api.spotify.com/v1/me/following?type=artist&limit=50`,
    session
  );

  return { props: { followedArtists: followedArtists.artists.items } };
};
