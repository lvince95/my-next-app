/*
A note about the Deposit Frequency type:

An easier way to handle the deposit frequency would be to create the following type:

type DepositFrequency = {
  id: number
  name: string
  priority: number
  createdAt: Date
  updatedAt: Date
}

and create a model/table for this in the database. This allows other tables to reference the deposit frequency using depositFrequencyId to get the priority.

However, that approach means that we have to create another table to store it (which could actually be what you want to allow admins to add more from an admin dashboard for example).

With the following approach using readonly const variables (you can use enums too), we do not have to create a database table and have relations to other tables for it. There are pros and cons to both.

This is just an alternative way showing type manipulation to keep them as readonly const variables while constraining the type
*/

// allows scaling e.g. adding new frequencies
export const depositFrequency = [
  { id: 1, name: 'One-Time', priority: 2 },
  { id: 2, name: 'Monthly', priority: 1 },
] as const;

// extract the names of the deposit frequencies using index access and store it in a type
export type DepositFrequency = (typeof depositFrequency)[number]['name'];

// create a lookup table to get the priority of the frequency
// auto scales based on the depositFrequency readonly array
export const depositFrequencyMap = depositFrequency.reduce((acc, df) => {
  acc.set(df.name, df.priority);
  return acc;
}, new Map<DepositFrequency, number>());

export type Portfolio = {
  id: number;
  name: string;
  allocation: number;
  createdAt: Date;
  updatedAt: Date;
};

// store the portfolios in the plans attribute as the whole object for now. should be portfolioId ideally. default value of priority should be 0
export type DepositPlan = {
  id: number;
  depositFrequency: DepositFrequency;
  plans: { portfolioId: number; amount: number }[];
  priority: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

/*
  representation of the frontend type for the fund deposits
  id is a string because it is assumed to be a random uuid. this id is not sent to the database because it is going to be created as a new entry in the database, with an autoincrement id set up already. No dates are needed as well since those will be created in the database.
*/

export type FundDeposit = {
  id: number;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
};

/*
  define the DTOs
  we usually want DTOs for transferring data between the frontend and the backend
  the numeric id is omitted and replaced with a string id in some places
  the id would be an auto incrementing int on the backend, but is a string on the frontend
  this is because multiple deposits can be created on the frontend without committing the data
  for now, a uuid is used on the frontend to keep track of the items created for indexing during deletion
*/
export type FundDepositDTO = { id: string } & Omit<
  FundDeposit,
  'id' | 'createdAt' | 'updatedAt'
>;

export type PortfolioDTO = Omit<
  Portfolio,
  'createdAt' | 'updatedAt' | 'allocation'
> &
  Partial<Pick<Portfolio, 'allocation'>>;

export type DepositPlanDTO = {
  id: string;
} & Omit<DepositPlan, 'id' | 'updatedAt' | 'plans'> & {
    plans: {
      portfolio: PortfolioDTO;
      amount: number;
    }[];
  };
