import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import CardItem from '@/app/CardItem';
import CardItemGrid from '@/app/CardItemGrid';
import Heading from '@/app/Heading';
import Layout from '@/app/Layout';
import { getter } from '@/utils/getter';
import { isAuthenticated } from '@/utils/isAuthenticated';

export default function Search({ categories }) {
  return (
    <Layout title="Spotify - Search">
      <Heading text="Browse Categories" />

      <CardItemGrid>
        {categories?.categories.items.map((category) => (
          <CardItem
            key={category.id}
            altTitle={category.name}
            heading={category.name}
            id={category.id}
            images={category.icons}
            type="genre"
          />
        ))}
      </CardItemGrid>
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

  const categories = await getter(
    'https://api.spotify.com/v1/browse/categories?limit=50&country=IN',
    session
  );
  return { props: { categories } };
};
