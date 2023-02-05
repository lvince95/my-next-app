import clsx from 'clsx';
import { ReactNode } from 'react';
import { TrashIcon } from '@/icons/TrashIcon';
import { DepositPlan, FundDeposit } from '../types/deposit';

type DepositDataTableProps = {
  data: DepositPlan[] | FundDeposit[];
  title?: string;
  subTitle?: string;
  button?: ReactNode;
  className?: string;
  allowDelete?: boolean;
  handleRemove?: (id: string) => void;
  showLess?: boolean;
};

export const DepositDataTable = ({
  data,
  title,
  subTitle,
  button,
  className,
  allowDelete = false,
  handleRemove = () => void undefined,
  showLess = false,
}: DepositDataTableProps) => {
  return (
    <div className={clsx(className, 'px-4 sm:px-6 lg:px-8')}>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            {title}{' '}
            <span className="text-zinc-600 dark:text-zinc-400">
              - {data.length} {data.length === 1 ? 'item' : 'items'}{' '}
              {data.length === 0 ? 'found' : 'added'}
            </span>
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {subTitle}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">{button}</div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {!showLess && data.length > 0 && (
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-zinc-600 dark:text-zinc-400 sm:pl-6 md:pl-0"
                    >
                      Portfolio
                    </th>
                  )}
                  {showLess && data.length > 0 && (
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-zinc-600 dark:text-zinc-400 sm:pl-6 md:pl-0"
                    >
                      Amount (USD)
                    </th>
                  )}
                  {!showLess && data.length > 0 && (
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-zinc-600 dark:text-zinc-400"
                    >
                      Amount (USD)
                    </th>
                  )}
                  {!showLess && data.length > 0 && (
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-zinc-600 dark:text-zinc-400"
                    >
                      Frequency
                    </th>
                  )}
                  <th
                    scope="col"
                    className="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0"
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.id}>
                    {Object.entries(item).map(([key, value]) => {
                      if (key === 'portfolio') {
                        return (
                          <td
                            key={key}
                            className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-zinc-600 dark:text-zinc-400 sm:pl-6 md:pl-0"
                          >
                            {value}
                          </td>
                        );
                      } else if (key !== 'id') {
                        return (
                          <td
                            key={key}
                            className="whitespace-nowrap py-4 px-3 text-sm text-zinc-600 dark:text-zinc-400 "
                          >
                            {key === 'amount' && '$'} {value}
                          </td>
                        );
                      }
                    })}
                    {allowDelete && (
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 md:pr-0">
                        <TrashIcon
                          aria-label="trash icon"
                          className="h-6 w-6 cursor-pointer"
                          onClick={() => handleRemove(item.id)}
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
