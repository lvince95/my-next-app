import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { Container } from '@/components/Layout/Container';
import { ModeToggle } from '@/components/ModeToggle/ModeToggle';
import avatarImage from '@/images/avatar.webp';
import { Navigation } from './Navigation';

type AvatarContainerProps = PropsWithChildren & {
  className?: string;
};

const AvatarContainer = ({ className, ...props }: AvatarContainerProps) => {
  return (
    <div
      className={clsx(
        className,
        'h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10',
      )}
      {...props}
    />
  );
};

type AvatarProps = PropsWithChildren & { large?: boolean; className?: string };

const Avatar = ({ large = false, className, ...props }: AvatarProps) => {
  return (
    <Link
      href="/"
      aria-label="Home"
      className={clsx(className, 'pointer-events-auto')}
      {...props}
    >
      <Image
        src={avatarImage}
        alt=""
        sizes={large ? '4rem' : '2.25rem'}
        className={clsx(
          'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
          large ? 'h-16 w-16' : 'h-9 w-9',
        )}
        placeholder="blur"
      />
    </Link>
  );
};

export const Header = () => {
  return (
    <header className="pointer-events-none relative z-50 flex flex-col">
      <div className="top-0 z-10 h-16 pt-6">
        <Container className="w-full">
          <div className="relative flex gap-4">
            <div className="flex flex-1">
              <AvatarContainer>
                <Avatar />
              </AvatarContainer>
            </div>
            <div className="flex flex-1 justify-end md:justify-center">
              <Navigation />
            </div>
            <div className="flex justify-end md:flex-1">
              <div className="pointer-events-auto">
                <ModeToggle />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};
