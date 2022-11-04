import Link from 'next/link';
import { MdSchedule } from 'react-icons/md';
import { Track } from '@/types/types';
import { fmtMSS } from '@/utils/formatDuration';
import Image from 'next/image';

interface IProps {
  tracks: Track[];
  noAlbum?: boolean;
  noArtist?: boolean;
}

export default function TracksTable({ tracks, noAlbum = false, noArtist = false }: IProps) {
  return (
    <div className="mt-8 grid grid-cols-12 gap-2 p-1">
      {!noArtist && (
        <>
          <div className="col-span-1 text-left font-semibold uppercase tracking-wider text-white">
            #
          </div>

          <div
            className={`${
              noAlbum ? 'col-span-10' : 'col-span-6'
            } text-left text-sm font-medium uppercase tracking-wider text-gray`}
          >
            Title
          </div>

          {!noAlbum && (
            <div className="col-span-4 text-left text-sm font-medium uppercase tracking-wider text-gray">
              Album
            </div>
          )}

          <div className="col-span-1 text-left text-sm font-medium uppercase tracking-wider text-gray">
            <MdSchedule className="text-xl" />
          </div>

          <div className="col-span-12 my-3 border-b border-gray"></div>
        </>
      )}

      <div className="col-span-12 w-full">
        {tracks?.map((track, index) => (
          <div
            className={`grid grid-cols-12 ${!track.preview_url ? 'opacity-50' : ''}`}
            key={track.id + index + 1}
          >
            <div className="col-span-1 my-3 flex items-center text-sm text-gray">{index + 1}</div>

            <div
              className={`${noAlbum ? 'col-span-10' : 'col-span-6'} my-3 flex w-full  items-center`}
            >
              <div className="flex w-full items-center gap-4">
                {(!noAlbum || noArtist) && (
                  <div className="h-10 w-10 flex-shrink-0">
                    <img
                      src={track.album.images?.[0].url}
                      alt={track.name}
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                )}

                <div className="w-full">
                  <h2
                    className={`w-10/12 truncate text-sm font-medium ${
                      track.preview_url ? 'cursor-pointer hover:underline' : 'cursor-default'
                    }`}
                  >
                    {track.name}
                  </h2>

                  {!noArtist && (
                    <div className="flex w-10/12 flex-wrap items-center gap-1 text-sm text-gray">
                      <span className="truncate ">
                        {track.artists.map((artist, index) => (
                          <Link key={artist.id + track.id} href={`/artist/${artist.id}`}>
                            <a>
                              <span className="hover:text-white hover:underline">
                                {index !== 0 ? `, ${artist.name}` : artist.name}
                              </span>
                            </a>
                          </Link>
                        ))}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {!noAlbum && (
              <div className="col-span-4 my-3 flex w-10/12 items-center text-sm text-gray">
                <Link href={`/album/${track.album.id}`}>
                  <a className="truncate hover:text-white hover:underline">{track.album.name}</a>
                </Link>
              </div>
            )}

            <div className="col-span-1 my-3 flex items-center text-sm text-gray ">
              {fmtMSS(track.duration_ms)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
