import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Heading from '@/app/Heading';
import Layout from '@/app/Layout';
import PlaylistList from '@/app/PlaylistList';
import { PlaylistType } from '@/types/types';
import { getter } from '@/utils/getter';
import { isAuthenticated } from '@/utils/isAuthenticated';

interface IProps {
  categoryName?: string;
  playlists: {
    items: PlaylistType[];
  };
}

export default function CategoryPlaylists({ categoryName, playlists }: IProps) {
  const [capitalizedCategory, setCapitalizedCategory] = useState('');

  useEffect(() => {
    if (categoryName) {
      const afterName = categoryName
        .split(' ')
        .map((i) => i[0].toUpperCase() + i.slice(1))
        .join(' ');
      setCapitalizedCategory(afterName);
    }
  }, [categoryName]);

  return (
    <Layout title={`Spotify - ${capitalizedCategory}`}>
      <Heading text={categoryName} className="capitalize" />
      <PlaylistList playlists={playlists?.items} />
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

  const categoryId = ctx.params?.category;
  const playlists = await getter(
    `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?country=IN&limit=50`,
    session
  );

  const categoryName = categoryId.toString().split('_').join(' ');

  return { props: { categoryName, playlists: playlists.playlists } };
};
