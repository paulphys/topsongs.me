import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/app/Header';
import PlayerTwo from '@/app/PlayerTwo';
import Sidebar from '@/app/Sidebar';

interface IProps {
  children: any;
  title: string;
}

export default function Layout({ children, title }: IProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Sidebar />
      <div className="ml-64 flex flex-col">
        <Header />
        <main className="mt-4 ml-4">{children}</main>
      </div>
    </>
  );
}
