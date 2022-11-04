import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/app/Header';
import { getGreeting } from '@/utils/getGreeting';
import { signOut, useSession } from 'next-auth/react';
import { MySession } from '@/types/types';
import Sidebar from '@/app/Sidebar';

interface UseSession {
  data: MySession | null;
}

interface IProps {
  children: any;
  title: string;
}

export default function Layout({ children, title }: IProps) {
  const { data: session }: UseSession = useSession();

  const router = useRouter();
  let body = {};

  if (session) {
    body = (
      <>
        <Head>
          <title>
            Good {getGreeting()} {session?.user?.name}
          </title>
          <link rel="shortcut icon" href={session?.user?.picture} />
        </Head>
        <Header />
        <Sidebar />
        <div className="ml-64 flex flex-col">
          <main className="">{children}</main>
        </div>
      </>
    );
  } else {
    body = (
      <>
        <div className="h-full w-full">
          <main className="bg-[#000]">{children}</main>
        </div>
      </>
    );
  }

  return <>{body}</>;
}
