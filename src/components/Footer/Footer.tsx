import { Container } from '@/components/Layout/Container';
import { GithubIcon } from '../Icons/GithubIcon';

const navigation = {
  social: [
    {
      name: 'GitHub',
      href: '#',
      icon: GithubIcon,
    },
  ],
};

export const Footer = () => {
  return (
    <footer className="mt-32">
      <Container upperBorder={true}>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-500 hover:text-gray-400"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} Vincent Lim. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};
