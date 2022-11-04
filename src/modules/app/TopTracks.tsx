import { PlaylistType } from '@/types/types';
import CardItem from './CardItemTop';
import CardItemGrid from './CardItemGrid';

interface IProps {
  toptracks: PlaylistType[];
}

export default function TopTracks({ toptracks }: IProps) {
  console.log(toptracks);
  return (
    <>
      {toptracks?.map((toptrack) => (
        <CardItem
          key={toptrack.id}
          id={toptrack.id}
          heading={toptrack.name}
          images={toptrack.album.images}
          type="toptrack"
          artist={toptrack.artists}
        />
      ))}
    </>
  );
}
