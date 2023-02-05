import { MinusSmallIcon } from '@/icons/MinusSmallIcon';
import { PlusSmallIcon } from '@/icons/PlusSmallIcon';
import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { DepositPlan, FundDeposit } from '../types/deposit';
import { DepositDataTable } from './DepositDataTable';

type SummaryTableProps = {
  tables: { name: string; arrayData: DepositPlan[] | FundDeposit[] }[];
  className?: string;
};

export const SummaryTable = ({ tables, className }: SummaryTableProps) => {
  return (
    <div className={clsx(className, 'mx-auto max-w-7xl px-6 lg:px-8')}>
      <div className="mx-auto max-w-4xl divide-y divide-gray-900/10 dark:divide-white/10">
        <h2 className="text-2xl font-bold leading-10 tracking-tight text-zinc-900 dark:text-zinc-100">
          Tables
        </h2>
        <dl className="mt-6 space-y-6 divide-y divide-gray-900/10 dark:divide-white/10">
          {tables.map((data) => (
            <Disclosure as="div" key={data.name} className="pt-6">
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-lg font-semibold leading-7 text-zinc-900 dark:text-zinc-100">
                        {data.name}
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <MinusSmallIcon
                            className="h-6 w-6 dark:stroke-zinc-100"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusSmallIcon
                            className="h-6 w-6 dark:stroke-zinc-100"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel className="text-gray-500">
                    <DepositDataTable
                      data={data.arrayData}
                      title=""
                      subTitle=""
                      allowDelete={false}
                      showLess={data.name === 'Fund Deposits'}
                    />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </div>
    </div>
  );
};
