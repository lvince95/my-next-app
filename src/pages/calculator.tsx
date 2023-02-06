import Head from 'next/head';
import { SimpleLayout } from '@/components/Layout';
import { CalculatorForm } from '@/features/calculator';

const Calculator = () => {
  return (
    <>
      <Head>
        <title>Projects - Vincent Lim</title>
        <meta name="description" content="Basic Calculator Implementation" />
      </Head>
      <SimpleLayout
        title="Arithmetic Sequence Calculator"
        intro="This calculator uses an iterative approach to evaluate the arithmetic expression that is passed as the input."
      >
        <CalculatorForm />
      </SimpleLayout>
    </>
  );
};

export default Calculator;
