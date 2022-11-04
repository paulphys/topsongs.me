import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { getter } from '@/utils/getter';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  const playlists = await getter('https://api.spotify.com/v1/me/playlists?limit=50', session);

  res.status(200).json(playlists);
}
