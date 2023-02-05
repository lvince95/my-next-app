import { DepositPlan, FundDeposit } from '@/deposit/types/deposit';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';

const stepVariant = {
  1: 'depositPlan',
  2: 'fundDeposit',
};

type SetDataType =
  | { step: 1; data: DepositPlan[] }
  | { step: 2; data: FundDeposit[] };

type DepositStore = {
  depositPlans: DepositPlan[];
  fundDeposits: FundDeposit[];
  setFormData: ({ step, data }: SetDataType) => void;
  addDepositPlan: (plan: Omit<DepositPlan, 'id'>) => void;
  removeDepositPlan: (id: string) => void;
  addFundDeposit: (deposit: Omit<FundDeposit, 'id'>) => void;
  removeFundDeposit: (id: string) => void;
};

export const useDepositStore = create<DepositStore>((set) => ({
  depositPlans: [],
  fundDeposits: [],
  setFormData: ({ step, data }) =>
    set((state) => ({
      ...state,
      [stepVariant[step]]: data,
    })),
  addDepositPlan: (plan: Omit<DepositPlan, 'id'>) => {
    set((state) => ({
      depositPlans: [
        ...state.depositPlans,
        {
          id: uuidv4(),
          portfolio: plan.portfolio,
          amount: plan.amount,
          depositFrequency: plan.depositFrequency,
        } as DepositPlan,
      ],
    }));
  },
  removeDepositPlan: (id: string) => {
    set((state) => ({
      depositPlans: state.depositPlans.filter((plan) => plan.id !== id),
    }));
  },
  addFundDeposit: (deposit: Omit<FundDeposit, 'id'>) => {
    set((state) => ({
      fundDeposits: [
        ...state.fundDeposits,
        {
          id: uuidv4(),
          amount: deposit.amount,
        } as FundDeposit,
      ],
    }));
  },
  removeFundDeposit: (id: string) => {
    set((state) => ({
      fundDeposits: state.fundDeposits.filter((deposit) => deposit.id !== id),
    }));
  },
}));
