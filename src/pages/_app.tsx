import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { useEffect } from 'react';
import Header from '@/app/Header';
import Sidebar from '@/app/Sidebar';
import Layout from '@/app/LayoutOld';
import { SpotifyProvider } from '@/context/SpotifyContext';
import PlausibleProvider from 'next-plausible';
import '@/styles/globals.css';
import '@/styles/nonTailwind.css';

nProgress.configure({
  showSpinner: false,
});

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: string) => {
      nProgress.start();
    };
    const handleStop = () => {
      nProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);
  return (
    <PlausibleProvider domain="topsongs.me">
      <SessionProvider session={pageProps.session}>
        <SpotifyProvider>
          <Component {...pageProps} />
        </SpotifyProvider>
      </SessionProvider>
    </PlausibleProvider>
  );
}

export default MyApp;
