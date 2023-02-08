import { SummaryForm } from '@/features/deposit';
import { SimpleLayoutWithBackButtonAndProgress } from '@/components/Layout';
import Head from 'next/head';
import { ProgressStep } from '@/components/Progress';

const depositFormSteps: ProgressStep[] = [
  { name: 'Deposit Plan', href: '/deposit/deposit-plan', status: 'complete' },
  { name: 'Fund Deposit', href: '/deposit/fund-deposit', status: 'complete' },
  { name: 'Summary', href: '/deposit/summary', status: 'current' },
];

const DepositSummaryPage = () => {
  return (
    <>
      <Head>
        <title>Summary</title>
        <meta
          name="description"
          content="Summary of all the deposit plans and fund deposits that will be used in your deposit"
        />
      </Head>
      <SimpleLayoutWithBackButtonAndProgress
        title="Deposit Summary"
        intro="You're almost there! Please review the details carefully before proceeding."
        prevUrl="/deposit/fund-deposit"
        steps={depositFormSteps}
      >
        <SummaryForm />
      </SimpleLayoutWithBackButtonAndProgress>
    </>
  );
};

export default DepositSummaryPage;
