import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Spinner } from './Spinner';

const variantStyles = {
  primary:
    'bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70',
  secondary:
    'bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70',
  warning:
    'bg-red-600 font-medium text-white hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70',
  teal: 'bg-teal-600 font-semibold text-white dark:text-zinc-100 hover:bg-teal-700 active:bg-teal-800 active:text-zinc-100/70',
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variantStyles;
  className?: string;
  isLoading?: boolean;
  children?: ReactNode;
} & IconProps;

export function Button({
  variant = 'primary',
  className,
  isLoading = false,
  startIcon,
  endIcon,
  children,
  ...props
}: ButtonProps) {
  className = clsx(
    'inline-flex relative items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none disabled:cursor-not-allowed disabled:opacity-50',
    variantStyles[variant],
    className,
    isLoading && 'text-opacity-0',
  );

  return (
    <button className={className} {...props}>
      {isLoading && (
        <Spinner size="sm" className="absolute m-auto text-current " />
      )}
      {!isLoading && startIcon}
      {children}
      {!isLoading && endIcon}
    </button>
  );
}
