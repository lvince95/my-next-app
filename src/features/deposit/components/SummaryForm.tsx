import { Button } from '@/components/Elements/Button';
import { PencilSquareIcon } from '@/icons/PencilSquareIcon';
import { useDepositStore } from '@/stores/deposit';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { DepositPlan, FundDeposit, Portfolio } from '../types/deposit';
import { SummaryTable } from './SummaryTable';

const calculateAllocation = (
  depositPlans: DepositPlan[],
  fundDeposits: FundDeposit[],
) => {
  const portfolios = new Map<string, Portfolio>();

  // get all available portfolios
  depositPlans.forEach((plan) =>
    portfolios.set(plan.portfolio, { name: plan.portfolio, allocation: 0 }),
  );

  portfolios.forEach((value, key) =>
    console.log(`${key}: ${value.allocation}`),
  );

  // get the total funds available
  let totalFundsAvailable = fundDeposits.reduce(
    (sum, deposit) => sum + deposit.amount,
    0,
  );

  // get the allocation for one-time deposits
  const totalAllocationOneTime = depositPlans
    .filter((plan) => plan.depositFrequency === 'One-Time')
    .reduce((sum, plan) => sum + plan.amount, 0);

  console.log('Total Allocation One-Time: ' + totalAllocationOneTime);

  // get the funds available for one-time deposits
  const totalFundsOneTime =
    totalFundsAvailable >= totalAllocationOneTime
      ? totalAllocationOneTime
      : totalFundsAvailable;

  // get the proportional allocation
  const proportionalAllocationOneTime =
    totalFundsOneTime / totalAllocationOneTime;

  console.log(
    'Proportional Allocation One-Time: ' + proportionalAllocationOneTime,
  );

  // assign each portfolio their appropriate values.
  depositPlans
    .filter((plan) => plan.depositFrequency === 'One-Time')
    .forEach((plan) => {
      const prevAllocation = portfolios.get(plan.portfolio);

      return portfolios.set(plan.portfolio, {
        name: plan.portfolio,
        allocation:
          (prevAllocation ? prevAllocation.allocation : 0) +
          plan.amount * proportionalAllocationOneTime,
      });
    });

  portfolios.forEach((value, key) =>
    console.log(`One-Time - ${key}: ${value.allocation}`),
  );

  // get the remaining funds available after completing the one-time deposits
  totalFundsAvailable -= totalAllocationOneTime;

  if (totalFundsAvailable > 0) {
    // get the allocation for monthly deposits
    const totalAllocationMonthly = depositPlans
      .filter((plan) => plan.depositFrequency === 'Monthly')
      .reduce((sum, plan) => sum + plan.amount, 0);

    console.log('Total Allocation Monthly: ' + totalAllocationMonthly);

    // get the funds available for monthly deposits
    const totalFundsMonthly =
      totalFundsAvailable >= totalAllocationMonthly
        ? totalAllocationMonthly
        : totalFundsAvailable;

    console.log('Total Funds Monthly: ' + totalFundsMonthly);

    // get the proportional allocation
    const proportionalAllocationMonthly =
      totalFundsMonthly / totalAllocationMonthly;

    console.log(
      'Proportional Allocation Monthly: ' + proportionalAllocationMonthly,
    );

    // assign each portfolio their appropriate values.
    depositPlans
      .filter((plan) => plan.depositFrequency === 'Monthly')
      .forEach((plan) => {
        const prevAllocation = portfolios.get(plan.portfolio);

        return portfolios.set(plan.portfolio, {
          name: plan.portfolio,
          allocation:
            (prevAllocation ? prevAllocation.allocation : 0) +
            plan.amount * proportionalAllocationMonthly,
        });
      });

    portfolios.forEach((value, key) =>
      console.log(`Monthly - ${key}: ${value.allocation}`),
    );
  }

  return { portfolios, totalFundsAvailable };
};

export const SummaryForm = () => {
  const { depositPlans, fundDeposits } = useDepositStore();

  const [portfolios, setPortfolios] = useState(new Map<string, Portfolio>());

  const router = useRouter();

  const tables = [
    { name: 'Deposit Plans', arrayData: depositPlans },
    { name: 'Fund Deposits', arrayData: fundDeposits },
  ];

  useEffect(() => {
    if (depositPlans.length === 0) {
      router.push('/deposit/deposit-plan');
    } else if (fundDeposits.length === 0) {
      router.push('/deposit/fund-deposit');
    }

    const { portfolios, totalFundsAvailable } = calculateAllocation(
      depositPlans,
      fundDeposits,
    );

    setPortfolios(portfolios);
  }, [depositPlans, fundDeposits]);

  return (
    <>
      <section aria-labelledby="applicant-information-title">
        <div className="border border-zinc-100 shadow dark:border-zinc-700/40 sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2
              id="applicant-information-title"
              className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100"
            >
              Detailed Information
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
              Personal details and deposit summary.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 dark:border-zinc-700/40 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  Name
                </dt>
                <dd className="dark:text-zinc-450 mt-1 text-sm font-semibold text-zinc-500">
                  Vincent Lim
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                  Email address
                </dt>
                <dd className="mt-1 text-sm font-semibold text-zinc-700 dark:text-zinc-500">
                  lvince95@gmail.com
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="flex items-center gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  Total Fund Deposit Amount
                  <PencilSquareIcon
                    className="h-6 w-6 cursor-pointer"
                    onClick={() => router.push('/deposit/fund-deposit')}
                  />
                </dt>
                <dd className="mt-1 text-sm font-semibold text-zinc-700 dark:text-zinc-500">
                  ${fundDeposits.reduce((sum, fd) => sum + fd.amount, 0)}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  Phone
                </dt>
                <dd className="mt-1 text-sm font-semibold text-zinc-700 dark:text-zinc-500">
                  +(60) 16 278-3797
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="flex items-center gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  Portfolio Allocation
                  <PencilSquareIcon
                    className="h-6 w-6 cursor-pointer"
                    onClick={() => router.push('/deposit/deposit-plan')}
                  />
                </dt>
                <dd className="mt-1 text-sm font-semibold text-zinc-700 dark:text-zinc-500">
                  {Array.from(portfolios, ([key, value]) => {
                    return (
                      <div key={key} className="flex items-center gap-2">
                        <p>
                          {value.name} = ${value.allocation}
                        </p>
                      </div>
                    );
                  })}
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <div className="block bg-gray-50 px-4 py-4 text-right dark:bg-transparent sm:rounded-b-lg">
              <Button
                form="summaryForm"
                type="submit"
                className="w-full flex-none lg:w-20"
                variant="teal"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </section>
      <SummaryTable className="mt-16" tables={tables} />
    </>
  );
};
