import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import type { AppProps, AppType } from 'next/app';
import '@/styles/tailwind.css';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Inter } from '@next/font/google';
import { trpc } from '@/utils/trpc';
import { Notifications } from '@/components/Notifications';

const inter = Inter({ subsets: ['latin'] });

const App = (({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const usePrevious = (value: string) => {
    const ref = useRef<string>();

    useEffect(() => {
      if (value) ref.current = value;
    }, [value]);

    return ref.current;
  };

  const previousPathname = usePrevious(router.pathname);

  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative">
        <Header />
        <main className={inter.className}>
          <Notifications />
          <Component previousPathname={previousPathname} {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}) as AppType;

export default trpc.withTRPC(App);
