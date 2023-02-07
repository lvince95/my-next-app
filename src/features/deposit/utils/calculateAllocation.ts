import {
  DepositFrequency,
  depositFrequencyMap,
  DepositPlanDTO,
  FundDepositDTO,
  PortfolioDTO,
} from '../types/depositV2';

// calculate the allocation
export const optimizedCalculateAllocation = (
  depositPlans: DepositPlanDTO[],
  fundDeposits: FundDepositDTO[],
) => {
  // keep a map to keep track of the portfolio allocations
  const portfolios = new Map<number, PortfolioDTO>();

  // keep a set for deposit frequncies to prevent duplicates
  const depositFrequencySet = new Set<DepositFrequency>();

  // get all unique portfolios and frequencies
  depositPlans.forEach((plan) => {
    depositFrequencySet.add(plan.depositFrequency);

    // initialize the given portfolio with 0 as the initial allocation
    plan.plans.forEach((p) => {
      portfolios.set(p.portfolio.id, { ...p.portfolio, allocation: 0 });
    });
  });

  // get the total funds available
  let totalFundsAvailable = fundDeposits.reduce(
    (sum, deposit) => sum + deposit.amount,
    0,
  );

  // sort the deposit frequencies in descending order based on the priority
  const sortedDepositFrequencies = Array.from(depositFrequencySet).sort(
    (a, b) => {
      return (
        // undefined check needed because of typescript's limitation
        (depositFrequencyMap.get(b) || 0) - (depositFrequencyMap.get(a) || 0)
      );
    },
  );

  // loop through the different frequencies found. starts with the highest priority since the array has already been sorted in descending order
  sortedDepositFrequencies.forEach((frequency) => {
    /*
      1. filter the deposit plans that match the current frequency passed in from the loop
      2. sort the filtered deposit plans in descending order based on their own priority
      3. sorts based on the date in ascending order
      4. loop through each deposit plan using every() instead of forEach() so that we can break
      out of the loop by returning false if we satisfy the condition early
    */
    depositPlans
      .filter((dp) => dp.depositFrequency === frequency)
      .sort((a, b) => b.priority - a.priority)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      .every((dp) => {
        // break out of the current deposit plan loop when no more funds are left
        if (totalFundsAvailable <= 0) return false;

        // get the total amount to be allocated in the current deposit plan
        const dpAllocation = dp.plans.reduce(
          (sum, plan) => sum + plan.amount,
          0,
        );

        // check if the totalFundsAvailable is greater than the total allocation
        // if there are not enough funds, we can only pay the minimum
        // if our funds exceed the total allocation, we only pay the total allocation and not more
        const fundsUsed =
          totalFundsAvailable >= dpAllocation
            ? dpAllocation
            : totalFundsAvailable;

        // get the proportional allocation
        const proportionalAllocation = fundsUsed / dpAllocation;

        // loop through each portfolio and the specified amount to be allocated
        dp.plans.forEach((p) => {
          // check if a previous allocation exists in the map
          const prevAllocation =
            portfolios.get(p.portfolio.id)?.allocation ?? 0;

          // calculate the amount to be allocated based on the calulcated proportion
          const amountAllocated = p.amount * proportionalAllocation;

          // updates the portfolio map to reflect the added allocation
          portfolios.set(p.portfolio.id, {
            ...p.portfolio,
            allocation: prevAllocation + amountAllocated,
          });

          // IMPORTANT: also reduce the amount in the deposit plan to indicate that there has been a payment made. If this is not done, there is no indication if the plan has been paid yet or not
          p.amount -= amountAllocated;

          // mark the current deposit plan as completely paid off for bookkeeping and filtering purposes
          if (p.amount === 0) dp.completed = true;

          // updates the total funds we have left by deducting it with the amount that has been allocated this iteration
          totalFundsAvailable -= amountAllocated;
        });

        // continue the loop
        return true;
      });
  });

  // return the objects. before this step, there would be an API call to the backend to update all the values and the updatedAt date column (assuming we're using a relational database). However, we shall skip this for now.
  return { portfolios, totalFundsAvailable, depositPlans };
};
