import { SimpleLayoutWithBackButtonAndProgress } from '@/components/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ProgressStep } from '@/components/Progress';
import { DepositPlanForm } from '@/deposit/components';

const depositFormSteps: ProgressStep[] = [
  { name: 'Deposit Plan', href: '/deposit/deposit-plan', status: 'current' },
  { name: 'Fund Deposit', href: '/deposit/fund-deposit', status: 'upcoming' },
  { name: 'Summary', href: '/deposit/summary', status: 'upcoming' },
];

const DepositPlanPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Deposit Funds - Deposit Plan</title>
        <meta name="description" content="Deposit Funds - Deposit Plan" />
      </Head>
      <SimpleLayoutWithBackButtonAndProgress
        title="Deposit Funds"
        intro="Make your fund deposits to your portfolios here."
        prevUrl="/deposit"
        steps={depositFormSteps}
      >
        <DepositPlanForm />
      </SimpleLayoutWithBackButtonAndProgress>
    </>
  );
};

export default DepositPlanPage;
