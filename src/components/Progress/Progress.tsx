import clsx from 'clsx';
import { CheckIcon } from '@/icons/CheckIcon';
import Link from 'next/link';

export type ProgressStep = {
  name: string;
  href: string;
  status: 'complete' | 'current' | 'upcoming';
};

type ProgressProps = {
  steps: ProgressStep[];
};

export const Progress = ({ steps }: ProgressProps) => {
  return (
    <nav aria-label="Progress" className="hidden sm:mr-32 md:block">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={clsx(
              stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '',
              'relative',
            )}
          >
            {step.status === 'complete' ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-teal-600" />
                </div>
                <Link
                  href={step.href}
                  className="relative flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 hover:bg-teal-900"
                >
                  <CheckIcon
                    className="h-5 w-5 stroke-white dark:stroke-zinc-100"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{step.name}</span>
                </Link>
              </>
            ) : step.status === 'current' ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <Link
                  href={step.href}
                  className="pointer-events-none relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-teal-600 bg-white"
                  aria-current="step"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-teal-600"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{step.name}</span>
                </Link>
              </>
            ) : (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <Link
                  href={step.href}
                  className="group pointer-events-none relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{step.name}</span>
                </Link>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
