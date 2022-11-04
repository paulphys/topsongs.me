import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import ArtistList from '@/app/ArtistList';
import Heading from '@/app/Heading';
import Layout from '@/app/Layout';
import { Artist } from '@/types/types';
import { getter } from '@/utils/getter';
import { isAuthenticated } from '@/utils/isAuthenticated';

interface IProps {
  query: string;
  searchArtists: {
    artists: {
      items: Artist[];
    };
  };
}

export default function SearchArtists({ query, searchArtists }: IProps) {
  return (
    <Layout title="Spotify - Search">
      <Heading text={`All artists for "${query}"`} />
      <ArtistList artists={searchArtists.artists.items} />
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

  const query = ctx.params?.query;
  const searchArtists = await getter(
    `https://api.spotify.com/v1/search?q=${query}&market=from_token&type=artist&limit=50`,
    session
  );
  return { props: { query, searchArtists } };
};
