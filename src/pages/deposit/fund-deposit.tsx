import { FundDepositForm } from '@/features/deposit';
import { SimpleLayoutWithBackButtonAndProgress } from '@/components/Layout';
import Head from 'next/head';
import { ProgressStep } from '@/components/Progress';

const depositFormSteps: ProgressStep[] = [
  { name: 'Deposit Plan', href: '/deposit/deposit-plan', status: 'complete' },
  { name: 'Fund Deposit', href: '/deposit/fund-deposit', status: 'current' },
  { name: 'Summary', href: '/deposit/summary', status: 'upcoming' },
];

const FundDepositPage = () => {
  return (
    <>
      <Head>
        <title>Deposit Funds - Fund Deposit</title>
        <meta name="description" content="Deposit Funds - Fund Deposit" />
      </Head>
      <SimpleLayoutWithBackButtonAndProgress
        title="Deposit Funds"
        intro="Make your fund deposits to your portfolios here."
        prevUrl="/deposit/deposit-plan"
        steps={depositFormSteps}
      >
        <FundDepositForm />
      </SimpleLayoutWithBackButtonAndProgress>
    </>
  );
};

export default FundDepositPage;
