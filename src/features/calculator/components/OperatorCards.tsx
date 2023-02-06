import { MinusIcon } from '@/icons/MinusIcon';
import { PlusIcon } from '@/icons/PlusIcon';
import { XMarkIcon } from '@/icons/XMarkIcon';
import { countOperators, getOperatorName } from '@/features/calculator';
import clsx from 'clsx';

type OperatorCardsProps = {
  operators: string[];
};

export const OperatorCards = ({ operators }: OperatorCardsProps) => {
  const operatorMap = countOperators(operators);

  return (
    <div>
      <ul
        role="list"
        className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
      >
        {Array.from(operatorMap, ([key, value]) => (
          <li key={key} className="col-span-1 flex rounded-md shadow-sm">
            {key === '+' ? (
              <div
                className={clsx(
                  'bg-pink-600',
                  'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-2xl font-medium text-white dark:border  dark:border-zinc-400',
                )}
              >
                <PlusIcon />
              </div>
            ) : key === '-' ? (
              <div
                className={clsx(
                  'bg-purple-600',
                  'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-2xl font-medium text-white dark:border  dark:border-zinc-400',
                )}
              >
                <MinusIcon />
              </div>
            ) : key === '*' ? (
              <div
                className={clsx(
                  'bg-yellow-500',
                  'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-2xl  font-medium text-white dark:border  dark:border-zinc-400',
                )}
              >
                <XMarkIcon />
              </div>
            ) : (
              <div
                className={clsx(
                  'bg-green-500',
                  'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-xl font-medium text-white dark:border  dark:border-zinc-400',
                )}
              >
                /
              </div>
            )}

            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-zinc-400 bg-white dark:bg-transparent">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  {getOperatorName(key)}
                </p>
                <p className="text-gray-500">
                  {value} {value === 1 ? 'time' : 'times'}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
