import { Container } from '@/components/Layout/Container';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { ArrowLeftIcon } from '@/icons/ArrowLeftIcon';
import { Progress, ProgressStep } from '../Progress';

type SimpleLayoutProps = {
  title: string;
  intro: string;
  children?: ReactNode;
  prevUrl?: string;
  steps?: ProgressStep[];
};

export const SimpleLayout = ({ title, intro, children }: SimpleLayoutProps) => {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          {intro}
        </p>
      </header>
      <div className="mt-16 sm:mt-20">{children}</div>
    </Container>
  );
};

export const SimpleLayoutWithBackButton = ({
  title,
  intro,
  children,
  prevUrl,
}: SimpleLayoutProps) => {
  const router = useRouter();

  return (
    <Container className="mt-4 sm:mt-20">
      <div
        className="mb-4 flex cursor-pointer items-center gap-2"
        onClick={() => {
          prevUrl ? router.push(prevUrl) : router.back();
        }}
      >
        <ArrowLeftIcon className="h-6 w-6 dark:stroke-zinc-400" />
        <p className="text-xl text-zinc-600 dark:text-zinc-400">Back</p>
      </div>
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          {intro}
        </p>
      </header>
      <div className="mt-16 sm:mt-20">{children}</div>
    </Container>
  );
};

export const SimpleLayoutWithBackButtonAndProgress = ({
  title,
  intro,
  children,
  prevUrl,
  steps = [],
}: SimpleLayoutProps) => {
  const router = useRouter();

  return (
    <Container className="mt-4 sm:mt-20">
      <div className="mb-4 flex justify-between">
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => {
            prevUrl ? router.push(prevUrl) : router.back();
          }}
        >
          <ArrowLeftIcon className="h-6 w-6 dark:stroke-zinc-400" />
          <p className="text-xl text-zinc-600 dark:text-zinc-400">Back</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <header className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              {intro}
            </p>
          </header>
        </div>
        <Progress steps={steps} />
      </div>
      <div className="mt-16 sm:mt-20">{children}</div>
    </Container>
  );
};

export const SimpleLayoutWithAnimation = ({
  title,
  intro,
  children,
}: SimpleLayoutProps) => {
  return (
    <Container className="mt-16 sm:mt-32">
      <motion.header
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
        }}
        className="max-w-2xl"
      >
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          {intro}
        </p>
      </motion.header>
      <div className="mt-16 sm:mt-20">{children}</div>
    </Container>
  );
};
