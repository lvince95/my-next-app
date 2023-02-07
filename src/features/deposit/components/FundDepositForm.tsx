import { Button } from '@/components/Elements/Button';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/Elements/Input';
import { DepositDataTable } from './DepositDataTable';
import { useDepositStore } from '@/features/deposit/stores/deposit';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const FundDepositFormSchema = z.object({
  amount: z.number().min(1, 'Required'),
});

export type FundDepositFormValues = z.infer<typeof FundDepositFormSchema>;

export const FundDepositForm = () => {
  const { depositPlans, fundDeposits, addFundDeposit, removeFundDeposit } =
    useDepositStore();

  const router = useRouter();

  useEffect(() => {
    if (depositPlans.length === 0) {
      router.push('/deposit');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FundDepositFormValues>({
    resolver: zodResolver(FundDepositFormSchema),
  });

  const onSubmit: SubmitHandler<FundDepositFormValues> = (data) => {
    addFundDeposit(data);
    reset();
  };

  return (
    <>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">
                Fund Deposit
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Add the amount you wish to deposit.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl border border-zinc-100 shadow dark:border-zinc-700/40"
              id="fundDepositForm"
            >
              <div className="overflow-hidden ">
                <div className="px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="amount"
                        className="block text-sm font-medium text-zinc-600 dark:text-zinc-400"
                      >
                        Amount
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <Input
                          id="amount"
                          type="text"
                          className="mt-1 block w-full pl-7 pr-12"
                          placeholder="0.00"
                          aria-label="fund deposit amount"
                          registration={register('amount', {
                            valueAsNumber: true,
                          })}
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span
                            className="text-gray-500 sm:text-sm"
                            id="price-currency"
                          >
                            USD
                          </span>
                        </div>
                      </div>
                      <div
                        role="alert"
                        aria-label={errors.amount?.message}
                        className="mt-4 text-sm font-semibold text-red-500"
                      >
                        {errors.amount?.message}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 text-right sm:px-6">
                  <Button
                    form="fundDepositForm"
                    type="submit"
                    className="w-full flex-none lg:w-20"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <DepositDataTable
        data={fundDeposits}
        title="Current Fund Deposits"
        subTitle="A list of all fund deposits added."
        button={
          <Button
            className="mt-4 w-full flex-none lg:mt-0 lg:w-20"
            variant="teal"
            onClick={() => router.push('/deposit/summary')}
            disabled={fundDeposits.length === 0}
          >
            Next
          </Button>
        }
        className="mt-8"
        allowDelete={true}
        handleRemove={removeFundDeposit}
      />
    </>
  );
};
