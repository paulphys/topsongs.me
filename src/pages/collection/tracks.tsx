import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Image from 'next/image';
import Layout from '@/app/Layout';
import TracksTable from '@/app/TracksTable';
import { MySession, PlaylistType } from '@/types/types';
import { getter } from '@/utils/getter';
import { isAuthenticated } from '@/utils/isAuthenticated';

interface IProps {
  likedTracks: PlaylistType;
}

export default function LikedTracks({ likedTracks }: IProps) {
  const { data: session }: { data: MySession } = useSession();
  if (status === 'loading') {
    return <div className="h-screen w-screen bg-[#121212]"></div>;
  }
  return (
    <Layout title="Spotify - Liked Songs">
      {likedTracks && (
        <>
          <div className="flex items-end gap-6">
            <Image
              src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
              alt="Liked Songs"
              height={208}
              width={208}
            />
            <div className="flex flex-col gap-3">
              <h5 className="text-sm font-bold uppercase">Playlist</h5>
              <h2 className="text-5xl font-bold">Liked Songs</h2>

              <div className="flex items-center gap-5 text-sm">
                <span className="font-bold">{session?.user.name}</span>
                {likedTracks.items.length > 0 && (
                  <span className="text-gray">{likedTracks.total} songs</span>
                )}{' '}
              </div>
            </div>
          </div>

          <TracksTable tracks={likedTracks.items.map((item) => item.track)} />
        </>
      )}
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

  const likedTracks = await getter(
    `https://api.spotify.com/v1/me/tracks?market=from_token&limit=50`,
    session
  );

  return { props: { likedTracks } };
};
