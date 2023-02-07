import { optimizedCalculateAllocation } from '../calculateAllocation';
import {
  expectedDepositResult,
  expectedPortfolioResult,
  expectedExcessFundsResult,
  testDepositPlans,
  testFundDeposits,
} from './testData';

const testsToRun = [
  'basic case',
  'partial case',
  'partial reversed case',
  'excess funds case',
];

describe('fund deposit testing', () => {
  testsToRun.forEach((testName) => {
    let excessFunds = 0;

    test(`should allocate funds to portfolios for a ${testName}`, () => {
      const planData = testDepositPlans.get(`${testName}`);
      const fundData = testFundDeposits.get(`${testName}`);
      const expected = expectedPortfolioResult.get(`${testName}`);

      expect(planData).toBeTruthy();
      expect(fundData).toBeTruthy();
      expect(expected).toBeTruthy();

      if (planData && fundData && expected) {
        const { portfolios, totalFundsAvailable } =
          optimizedCalculateAllocation(planData, fundData);

        excessFunds = totalFundsAvailable;

        portfolios.forEach((value, index) => {
          expect(value.name).toBe(expected[index - 1].name);

          expect(value.allocation?.toString()).toBe(
            expected[index - 1].allocation?.toString(),
          );
        });
      }
    });

    test(`should have the correct deposit result for a ${testName}`, () => {
      const planData = testDepositPlans.get(`${testName}`);
      const fundData = testFundDeposits.get(`${testName}`);
      const expected = expectedDepositResult.get(`${testName}`);

      expect(planData).toBeTruthy();
      expect(fundData).toBeTruthy();
      expect(expected).toBeTruthy();

      if (planData && fundData && expected) {
        planData.forEach((value, index) => {
          expect(value.plans[0].amount).toBe(expected[index].plans[0].amount);

          expect(value.plans[1].amount).toBe(expected[index].plans[1].amount);
        });
      }
    });

    test(`should update the deposit status if appropriate for a ${testName}`, () => {
      const planData = testDepositPlans.get(`${testName}`);
      const fundData = testFundDeposits.get(`${testName}`);
      const expected = expectedDepositResult.get(`${testName}`);

      expect(planData).toBeTruthy();
      expect(fundData).toBeTruthy();
      expect(expected).toBeTruthy();

      if (planData && fundData && expected) {
        planData.forEach((dp, index) => {
          expect(dp.completed).toBe(expected[index].completed);
        });
      }
    });

    test(`should return excess funds if appropriate for a ${testName}`, () => {
      const expected = expectedExcessFundsResult.get(`${testName}`);

      expect(excessFunds).toBe(expected);
    });
  });
});
