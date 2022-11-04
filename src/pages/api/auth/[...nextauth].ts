import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const scope =
  'playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-read-recently-played user-read-playback-state user-top-read user-read-currently-playing user-follow-read user-read-email user-read-private user-library-read';

async function refreshAccessToken(token) {
  try {
    const url = 'https://accounts.spotify.com/api/token';
    const authHeader = process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET;
    const based = Buffer.from(authHeader).toString('base64');
    const body = 'grant_type=refresh_token&refresh_token=' + token.refresh_token;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + based,
      },
      body: body,
      method: 'POST',
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: { scope },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id = account.id;
        token.expires_at = account.expires_at;
        token.accessToken = account.access_token;
        token.accessTokenExpires = account.expires_at * 1000;
        token.refresh_token = account.refresh_token;
        const queryUsers = await prisma.user.findUnique({
          where: {
            username: account.providerAccountId,
          },
        });
        if (!queryUsers) {
          const newUser = await prisma.user.create({
            data: {
              refreshToken: account.refresh_token,
              username: account.providerAccountId,
              email: token.email,
              avatar: token.picture,
              name: token.name,
            },
          });
        } else {
          const updateUser = await prisma.user.update({
            where: {
              username: account.providerAccountId,
            },
            data: {
              lastSeen: new Date().toISOString(),
              refreshToken: account.refresh_token,
            },
          });
        }
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = token;
      session.access_token = token.access_token;
      session.error = token.error;
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
});
