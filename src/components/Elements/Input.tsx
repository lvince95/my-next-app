import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  registration?: Partial<UseFormRegisterReturn>;
  error?: FieldError | undefined;
};

export const Input = ({
  type = 'text',
  className,
  registration,
  error,
  ...props
}: InputProps) => {
  return (
    <>
      <input
        type={type}
        className={clsx(
          'min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm',
          className,
        )}
        {...registration}
        {...props}
      />
      {error?.message && (
        <div
          role="alert"
          aria-label={error.message}
          className="text-sm font-semibold text-red-500"
        >
          {error.message}
        </div>
      )}
    </>
  );
};
