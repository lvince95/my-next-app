import { DepositPlan } from '@/deposit/types/deposit';
import { FundDeposit } from '@/deposit/types/deposit';
import { Portfolio } from '@/deposit/types/deposit';

const depositFrequencyPriority = new Map([
  ['One-Time', 1],
  ['Monthly', 2],
]);

export const calculateAllocationOptimized = (
  depositPlans: DepositPlan[],
  fundDeposits: FundDeposit[],
) => {
  const portfolios = new Map<string, Portfolio>();

  // get all available portfolios
  depositPlans.forEach((plan) =>
    portfolios.set(plan.portfolio, { name: plan.portfolio, allocation: 0 }),
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

  return portfolios;
};
