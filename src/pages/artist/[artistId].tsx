import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { RiMusic2Fill } from 'react-icons/ri';
import AlbumList from '@/app/AlbumList';
import ArtistList from '@/app/ArtistList';
import Heading from '@/app/Heading';
import Layout from '@/app/Layout';
import TracksTable from '@/app/TracksTable';
import { Album, Artist, Track } from '@/types/types';
import { getter } from '@/utils/getter';
import { isAuthenticated } from '@/utils/isAuthenticated';
import Image from 'next/image';

interface Albums {
  items: Album[];
}

interface IProps {
  artist: Artist;
  artistTracks: Track[];
  artistAlbums: Albums;
  artistSingles: Albums;
  artistAppearsOn: Albums;
  artistCompilation: Albums;
  relatedArtists: {
    artists: [Artist];
  };
}

export default function SingleArtist({
  artist,
  artistTracks,
  artistAlbums,
  artistSingles,
  artistAppearsOn,
  artistCompilation,
  relatedArtists,
}: IProps) {
  return (
    <Layout title={`Spotify - ${artist?.name}`}>
      <div className="flex items-end gap-6">
        {artist && (
          <>
            {artist.images.length > 0 ? (
              <Image
                src={artist.images[0].url}
                alt={artist.name}
                className="h-52 w-52 rounded-full object-contain"
              />
            ) : (
              <div className="h-40 w-full">
                <RiMusic2Fill className="h-full w-full bg-paper " />
              </div>
            )}
            <div className="flex flex-col items-start gap-3">
              <h2 className="text-5xl font-bold">{artist.name}</h2>
              <span className="text-sm">{artist.followers.total.toLocaleString()} followers</span>
              <div className="flex items-center gap-5 text-sm">
                {artist.genres.map((genre) => (
                  <span key={genre}>{genre}</span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-8">
        <Heading text="Popular" />
        <div className="-mt-8">
          <TracksTable tracks={artistTracks} noAlbum noArtist />
        </div>
      </div>

      {artistAlbums?.items.length > 0 && (
        <div className="mt-12">
          <Heading text="Albums" />
          <AlbumList albums={artistAlbums.items} />
        </div>
      )}

      {artistSingles?.items.length > 0 && (
        <div className="mt-12">
          <Heading text="Singles" />
          <AlbumList albums={artistSingles.items} />
        </div>
      )}

      {artistAppearsOn?.items.length > 0 && (
        <div className="mt-12">
          <Heading text="Appears on" />
          <AlbumList albums={artistAppearsOn.items} />
        </div>
      )}

      {artistCompilation?.items.length > 0 && (
        <div className="mt-12">
          <Heading text="Compilation" />
          <AlbumList albums={artistCompilation.items} />
        </div>
      )}

      {relatedArtists?.artists.length > 0 && (
        <div className="mt-12">
          <Heading text="Fans also like" />
          <ArtistList artists={relatedArtists.artists} />
        </div>
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

  const artistId = ctx.params.artistId;
  const artist = await getter(`https://api.spotify.com/v1/artists/${artistId}`, session);

  const artistTracks = await getter(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=from_token`,
    session
  );

  const artistAlbums = await getter(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album`,
    session
  );

  const artistSingles = await getter(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=single`,
    session
  );

  const artistAppearsOn = await getter(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=appears_on`,
    session
  );

  const artistCompilation = await getter(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=compilation`,
    session
  );

  const relatedArtists = await getter(
    `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
    session
  );

  return {
    props: {
      artist,
      artistTracks: artistTracks.tracks,
      artistAlbums,
      artistSingles,
      artistAppearsOn,
      artistCompilation,
      relatedArtists,
    },
  };
};
