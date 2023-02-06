import clsx from 'clsx';
import { ReactNode } from 'react';
import { TrashIcon } from '@/icons/TrashIcon';
import { DepositPlan, FundDeposit } from '../types/deposit';
import { parseTableColumnHeader } from '@/utils/stringUtils';

type DepositDataTableProps = {
  data: DepositPlan[] | FundDeposit[];
  title?: string;
  subTitle?: string;
  button?: ReactNode;
  className?: string;
  allowDelete?: boolean;
  handleRemove?: (id: string) => void;
};

export const DepositDataTable = ({
  data,
  title,
  subTitle,
  button,
  className,
  allowDelete = false,
  handleRemove = () => void undefined,
}: DepositDataTableProps) => {
  return (
    <div className={clsx(className, 'px-4 sm:px-6 lg:px-8')}>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            {title}{' '}
            <span
              className={clsx(
                !allowDelete && 'text-sm',
                'text-zinc-600 dark:text-zinc-400',
              )}
            >
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
                {data.map((item) => (
                  <tr key={item.id}>
                    {Object.entries(item).map(([key], index) => {
                      if (index === 1) {
                        return (
                          <th
                            key={key}
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-zinc-600 dark:text-zinc-400 sm:pl-6 md:pl-0"
                          >
                            {parseTableColumnHeader(key)}
                          </th>
                        );
                      } else if (index > 1) {
                        return (
                          <td
                            key={key}
                            className="whitespace-nowrap py-4 px-3 text-sm text-zinc-600 dark:text-zinc-400"
                          >
                            {parseTableColumnHeader(key)}
                          </td>
                        );
                      }
                    })}
                    {allowDelete && (
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    )}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.id}>
                    {Object.entries(item).map(([key, value], index) => {
                      if (index === 1) {
                        return (
                          <td
                            key={key}
                            className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-zinc-600 dark:text-zinc-400 sm:pl-6 md:pl-0"
                          >
                            {value}
                          </td>
                        );
                      } else if (index > 1) {
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
