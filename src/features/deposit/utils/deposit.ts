import { DepositPlan, FundDeposit, Portfolio } from '@/features/deposit';

export const calculateAllocation = (
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

  // get the funds available for one-time deposits
  const totalFundsOneTime =
    totalFundsAvailable >= totalAllocationOneTime
      ? totalAllocationOneTime
      : totalFundsAvailable;

  // get the proportional allocation
  const proportionalAllocationOneTime =
    totalFundsOneTime / totalAllocationOneTime;

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

  // get the remaining funds available after completing the one-time deposits
  totalFundsAvailable -= totalAllocationOneTime;

  if (totalFundsAvailable > 0) {
    // get the allocation for monthly deposits
    const totalAllocationMonthly = depositPlans
      .filter((plan) => plan.depositFrequency === 'Monthly')
      .reduce((sum, plan) => sum + plan.amount, 0);

    // get the funds available for monthly deposits
    const totalFundsMonthly =
      totalFundsAvailable >= totalAllocationMonthly
        ? totalAllocationMonthly
        : totalFundsAvailable;

    // get the proportional allocation
    const proportionalAllocationMonthly =
      totalFundsMonthly / totalAllocationMonthly;

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
  }

  return { portfolios, totalFundsAvailable };
};
