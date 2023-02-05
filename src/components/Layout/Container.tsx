import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type OuterContainerProps = PropsWithChildren & {
  className?: string;
  upperBorder?: boolean;
};

const OuterContainer = ({
  className,
  children,
  upperBorder,
  ...props
}: OuterContainerProps) => {
  return (
    <div className={clsx('sm:px-8', className)} {...props}>
      {upperBorder && (
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="w-full border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
            {children}
          </div>
        </div>
      )}
      {!upperBorder && (
        <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
      )}
    </div>
  );
};

type InnerContainerProps = PropsWithChildren & {
  className?: string;
};

const InnerContainer = ({
  className,
  children,
  ...props
}: InnerContainerProps) => {
  return (
    <div
      className={clsx('relative px-4 sm:px-8 lg:px-12', className)}
      {...props}
    >
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </div>
  );
};

type ContainerProps = PropsWithChildren & {
  className?: string;
  upperBorder?: boolean;
};

export const Container = ({
  children,
  upperBorder = false,
  ...props
}: ContainerProps) => {
  return (
    <OuterContainer {...props} upperBorder={upperBorder}>
      <InnerContainer>{children}</InnerContainer>
    </OuterContainer>
  );
};
