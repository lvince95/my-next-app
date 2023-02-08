import {
  DepositPlanDTO,
  FundDepositDTO,
  PortfolioDTO,
} from '../../types/depositV2';

export const testDataPortfolio: PortfolioDTO[] = [
  {
    id: 1,
    name: 'High Risk',
  },
  {
    id: 2,
    name: 'Retirement',
  },
];

export const testDepositPlans = new Map<string, DepositPlanDTO[]>([
  [
    'basic case',
    [
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 10000 },
          { portfolio: testDataPortfolio[1], amount: 500 },
        ],
        priority: 0,
        completed: false,
        createdAt: new Date('2023-02-04'),
      },
      {
        id: 'randomUuid4',
        depositFrequency: 'Monthly',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 0 },
          { portfolio: testDataPortfolio[1], amount: 100 },
        ],
        priority: 0,
        completed: false,
        createdAt: new Date('2023-02-04'),
      },
    ],
  ],
  [
    'partial case',
    [
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 100 },
          { portfolio: testDataPortfolio[1], amount: 400 },
        ],
        priority: 1,
        completed: false,
        createdAt: new Date('2023-02-04'),
      },
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 400 },
          { portfolio: testDataPortfolio[1], amount: 400 },
        ],
        priority: 2,
        completed: false,
        createdAt: new Date('2023-02-04'),
      },
    ],
  ],
  [
    'partial reversed case',
    [
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 100 },
          { portfolio: testDataPortfolio[1], amount: 400 },
        ],
        priority: 2,
        completed: false,
        createdAt: new Date('2023-02-04'),
      },
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 400 },
          { portfolio: testDataPortfolio[1], amount: 400 },
        ],
        priority: 1,
        completed: false,
        createdAt: new Date('2023-02-04'),
      },
    ],
  ],
  [
    'partial different frequency case',
    [
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 100 },
          { portfolio: testDataPortfolio[1], amount: 400 },
        ],
        priority: 1,
        completed: false,
        createdAt: new Date('2023-02-04'),
      },
      {
        id: 'randomUuid4',
        depositFrequency: 'Monthly',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 400 },
          { portfolio: testDataPortfolio[1], amount: 400 },
        ],
        priority: 2,
        completed: false,
        createdAt: new Date('2023-02-04'),
      },
    ],
  ],
  [
    'partial different frequency reversed case',
    [
      {
        id: 'randomUuid4',
        depositFrequency: 'Monthly',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 100 },
          { portfolio: testDataPortfolio[1], amount: 400 },
        ],
        priority: 1,
        completed: false,
        createdAt: new Date('2023-02-04'),
      },
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 400 },
          { portfolio: testDataPortfolio[1], amount: 400 },
        ],
        priority: 2,
        completed: false,
        createdAt: new Date('2023-02-04'),
      },
    ],
  ],
  [
    'partial date case',
    [
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 100 },
          { portfolio: testDataPortfolio[1], amount: 400 },
        ],
        priority: 0,
        completed: false,
        createdAt: new Date('2023-02-04'),
      },
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 400 },
          { portfolio: testDataPortfolio[1], amount: 400 },
        ],
        priority: 0,
        completed: false,
        createdAt: new Date('2023-02-02'),
      },
    ],
  ],
  [
    'partial date reversed case',
    [
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 100 },
          { portfolio: testDataPortfolio[1], amount: 400 },
        ],
        priority: 0,
        completed: false,
        createdAt: new Date('2023-02-02'),
      },
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 400 },
          { portfolio: testDataPortfolio[1], amount: 400 },
        ],
        priority: 0,
        completed: false,
        createdAt: new Date('2023-02-04'),
      },
    ],
  ],
  [
    'excess funds case',
    [
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 10000 },
          { portfolio: testDataPortfolio[1], amount: 500 },
        ],
        priority: 0,
        completed: false,
        createdAt: new Date('2023-02-04'),
      },
      {
        id: 'randomUuid4',
        depositFrequency: 'Monthly',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 0 },
          { portfolio: testDataPortfolio[1], amount: 100 },
        ],
        priority: 0,
        completed: false,
        createdAt: new Date('2023-02-04'),
      },
    ],
  ],
]);

export const testFundDeposits = new Map<string, FundDepositDTO[]>([
  [
    'basic case',
    [
      {
        id: 'randUuid',
        amount: 10500,
      },
      {
        id: 'randUuid2',
        amount: 100,
      },
    ],
  ],
  [
    'partial case',
    [
      {
        id: 'randUuid',
        amount: 500,
      },
      {
        id: 'randUuid2',
        amount: 500,
      },
    ],
  ],
  [
    'partial reversed case',
    [
      {
        id: 'randUuid',
        amount: 500,
      },
      {
        id: 'randUuid2',
        amount: 500,
      },
    ],
  ],
  [
    'partial different frequency case',
    [
      {
        id: 'randUuid',
        amount: 500,
      },
      {
        id: 'randUuid2',
        amount: 500,
      },
    ],
  ],
  [
    'partial different frequency reversed case',
    [
      {
        id: 'randUuid',
        amount: 500,
      },
      {
        id: 'randUuid2',
        amount: 500,
      },
    ],
  ],
  [
    'partial date case',
    [
      {
        id: 'randUuid',
        amount: 500,
      },
      {
        id: 'randUuid2',
        amount: 500,
      },
    ],
  ],
  [
    'partial date reversed case',
    [
      {
        id: 'randUuid',
        amount: 500,
      },
      {
        id: 'randUuid2',
        amount: 500,
      },
    ],
  ],
  [
    'excess funds case',
    [
      {
        id: 'randUuid',
        amount: 10500,
      },
      {
        id: 'randUuid2',
        amount: 1100,
      },
    ],
  ],
]);

export const expectedPortfolioResult = new Map<
  string,
  Omit<PortfolioDTO, 'id'>[]
>([
  [
    'basic case',
    [
      {
        name: 'High Risk',
        allocation: 10000,
      },
      {
        name: 'Retirement',
        allocation: 600,
      },
    ],
  ],
  [
    'partial case',
    [
      {
        name: 'High Risk',
        allocation: 440,
      },
      {
        name: 'Retirement',
        allocation: 560,
      },
    ],
  ],
  [
    'partial reversed case',
    [
      {
        name: 'High Risk',
        allocation: 350,
      },
      {
        name: 'Retirement',
        allocation: 650,
      },
    ],
  ],
  [
    'partial different frequency case',
    [
      {
        name: 'High Risk',
        allocation: 350,
      },
      {
        name: 'Retirement',
        allocation: 650,
      },
    ],
  ],
  [
    'partial different frequency reversed case',
    [
      {
        name: 'High Risk',
        allocation: 440,
      },
      {
        name: 'Retirement',
        allocation: 560,
      },
    ],
  ],
  [
    'partial date case',
    [
      {
        name: 'High Risk',
        allocation: 440,
      },
      {
        name: 'Retirement',
        allocation: 560,
      },
    ],
  ],
  [
    'partial date reversed case',
    [
      {
        name: 'High Risk',
        allocation: 350,
      },
      {
        name: 'Retirement',
        allocation: 650,
      },
    ],
  ],
  [
    'excess funds case',
    [
      {
        name: 'High Risk',
        allocation: 10000,
      },
      {
        name: 'Retirement',
        allocation: 600,
      },
    ],
  ],
]);

export const expectedDepositResult = new Map<string, DepositPlanDTO[]>([
  [
    'basic case',
    [
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 0 },
          { portfolio: testDataPortfolio[1], amount: 0 },
        ],
        priority: 0,
        completed: true,
        createdAt: new Date('2023-02-04'),
      },
      {
        id: 'randomUuid4',
        depositFrequency: 'Monthly',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 0 },
          { portfolio: testDataPortfolio[1], amount: 0 },
        ],
        priority: 0,
        completed: true,
        createdAt: new Date('2023-02-04'),
      },
    ],
  ],
  [
    'partial case',
    [
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 60 },
          { portfolio: testDataPortfolio[1], amount: 240 },
        ],
        priority: 1,
        completed: false,
        createdAt: new Date('2023-02-04'),
      },
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 0 },
          { portfolio: testDataPortfolio[1], amount: 0 },
        ],
        priority: 2,
        completed: true,
        createdAt: new Date('2023-02-04'),
      },
    ],
  ],
  [
    'partial reversed case',
    [
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 0 },
          { portfolio: testDataPortfolio[1], amount: 0 },
        ],
        priority: 2,
        completed: true,
        createdAt: new Date('2023-02-04'),
      },
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 150 },
          { portfolio: testDataPortfolio[1], amount: 150 },
        ],
        priority: 1,
        completed: false,
        createdAt: new Date('2023-02-04'),
      },
    ],
  ],
  [
    'partial different frequency case',
    [
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 0 },
          { portfolio: testDataPortfolio[1], amount: 0 },
        ],
        priority: 1,
        completed: true,
        createdAt: new Date('2023-02-04'),
      },
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 150 },
          { portfolio: testDataPortfolio[1], amount: 150 },
        ],
        priority: 2,
        completed: false,
        createdAt: new Date('2023-02-04'),
      },
    ],
  ],
  [
    'partial different frequency reversed case',
    [
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 60 },
          { portfolio: testDataPortfolio[1], amount: 240 },
        ],
        priority: 1,
        completed: false,
        createdAt: new Date('2023-02-04'),
      },
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 0 },
          { portfolio: testDataPortfolio[1], amount: 0 },
        ],
        priority: 2,
        completed: true,
        createdAt: new Date('2023-02-04'),
      },
    ],
  ],
  [
    'partial date case',
    [
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 60 },
          { portfolio: testDataPortfolio[1], amount: 240 },
        ],
        priority: 0,
        completed: false,
        createdAt: new Date('2023-02-04'),
      },
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 0 },
          { portfolio: testDataPortfolio[1], amount: 0 },
        ],
        priority: 0,
        completed: true,
        createdAt: new Date('2023-02-02'),
      },
    ],
  ],
  [
    'partial date reversed case',
    [
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 0 },
          { portfolio: testDataPortfolio[1], amount: 0 },
        ],
        priority: 0,
        completed: true,
        createdAt: new Date('2023-02-02'),
      },
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 150 },
          { portfolio: testDataPortfolio[1], amount: 150 },
        ],
        priority: 0,
        completed: false,
        createdAt: new Date('2023-02-04'),
      },
    ],
  ],
  [
    'excess funds case',
    [
      {
        id: 'randomUuid4',
        depositFrequency: 'One-Time',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 0 },
          { portfolio: testDataPortfolio[1], amount: 0 },
        ],
        priority: 0,
        completed: true,
        createdAt: new Date('2023-02-04'),
      },
      {
        id: 'randomUuid4',
        depositFrequency: 'Monthly',
        plans: [
          { portfolio: testDataPortfolio[0], amount: 0 },
          { portfolio: testDataPortfolio[1], amount: 0 },
        ],
        priority: 0,
        completed: true,
        createdAt: new Date('2023-02-04'),
      },
    ],
  ],
]);

export const expectedExcessFundsResult = new Map<string, number>([
  ['basic case', 0],
  ['partial case', 0],
  ['partial reversed case', 0],
  ['partial different frequency case', 0],
  ['partial different frequency reversed case', 0],
  ['partial date case', 0],
  ['partial date reversed case', 0],
  ['excess funds case', 1000],
]);
