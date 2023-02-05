import { Button } from '@/components/Elements/Button';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { calculate } from '@/utils/calculate';
import { useState } from 'react';
import { Input } from '@/components/Elements/Input';
import { CalculationResult } from './CalculationResult';

const CalculatorFormSchema = z.object({
  mathExpression: z.string().min(1, 'Required'),
});

type CalculatorFormValues = z.infer<typeof CalculatorFormSchema>;

export const CalculatorForm = () => {
  const [result, setResult] = useState<number>();
  const [operations, setOperations] = useState<string[]>([]);
  const [operators, setOperators] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<CalculatorFormValues>({
    resolver: zodResolver(CalculatorFormSchema),
  });

  const clearStates = () => {
    setResult(undefined);
    setOperations([]);
    setOperators([]);
  };

  const onSubmit: SubmitHandler<CalculatorFormValues> = (data) => {
    try {
      setOperations([]);
      const { result, operationsStack, operators } = calculate(
        data.mathExpression,
      );
      setResult(result);
      setOperations(operationsStack);
      setOperators(operators);
    } catch (error) {
      // TODO: proper error handling
      // let errorMessage = 'Unknown Error';
      // if (error instanceof Error) errorMessage = error.message;
      clearStates();
      setError(
        'mathExpression',
        {
          type: 'focus',
          message:
            'Failed to parse the expression. Please ensure that there are no spaces between the numbers and operators.',
        },
        { shouldFocus: true },
      );
    }
  };

  const onClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault;
    reset();
    clearStates();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
        id="calculatorForm"
      >
        <h2 className="flex justify-between gap-8 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <span>
            Enter the arithmetic expression you would like to have calculated
            below
          </span>
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Only numbers and the + - * / ( ) operators are supported. Please
          ensure that there are spaces between each number and operator.
        </p>
        <div className="mt-6 flex flex-col gap-4 lg:flex-row">
          <Input
            id="mathExpression"
            placeholder="2 / ( 3 + ( 5 + 6 * 2 ) )"
            aria-label="arithmetic expression"
            registration={register('mathExpression')}
          />
          <Button
            form="calculatorForm"
            type="submit"
            className="w-full flex-none lg:w-20"
            variant="teal"
          >
            Compute
          </Button>
          <Button
            type="button"
            variant="warning"
            className="w-full flex-none lg:w-20"
            onClick={onClear}
          >
            Clear
          </Button>
        </div>
        <div
          role="alert"
          aria-label={errors.mathExpression?.message}
          className="mt-4 text-sm font-semibold text-red-500"
        >
          {errors.mathExpression?.message}
        </div>
      </form>
      <CalculationResult
        result={result}
        operations={operations}
        operators={operators}
      />
    </>
  );
};
