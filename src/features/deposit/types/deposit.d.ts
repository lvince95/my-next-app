export type DepositPlan = {
  id: string;
  portfolio: string;
  amount: number;
  depositFrequency: 'One-Time' | 'Monthly';
};

export type FundDeposit = {
  id: string;
  amount: number;
};

export type Portfolio = {
  name: string;
  allocation: number;
};

export const paymentFrequency = [
  { id: 1, title: 'One-Time' },
  { id: 2, title: 'Monthly' },
] as const;
