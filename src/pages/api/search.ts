import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { getter } from '@/utils/getter';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query?.q;
  const session = await getSession({ req });

  const searchResults = await getter(
    `https://api.spotify.com/v1/search?q=${query}&market=from_token&type=album,track,artist,playlist&limit=50`,
    session
  );
  res.status(200).json(searchResults);
}
