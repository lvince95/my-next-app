import { Button } from '@/components/Elements/Button';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/Elements/Input';
import { DepositDataTable } from './DepositDataTable';
import { useDepositStore } from '@/features/deposit/stores/deposit';
import { useRouter } from 'next/router';
import { DepositPlan, paymentFrequency } from '../types/deposit';

const DepositPlanFormSchema = z.object({
  portfolio: z.string().min(1, 'Required'),
  amount: z
    .number({ invalid_type_error: 'Amount must be a valid number' })
    .min(1, 'Required'),
  depositFrequency: z.string().min(1, 'Required'),
});

export type DepositPlanFormValues = Omit<DepositPlan, 'id'>;

export const DepositPlanForm = () => {
  const { depositPlans, addDepositPlan, removeDepositPlan } = useDepositStore();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DepositPlanFormValues>({
    resolver: zodResolver(DepositPlanFormSchema),
  });

  const onSubmit: SubmitHandler<DepositPlanFormValues> = (data) => {
    addDepositPlan(data);
    reset();
  };

  return (
    <>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">
                Deposit Plan
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Add the deposit plans you want to be fulfilling.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl border border-zinc-100 shadow dark:border-zinc-700/40"
              id="depositPlanForm"
            >
              <div className="overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="portfolio"
                        className="block text-sm font-medium text-zinc-600 dark:text-zinc-400"
                      >
                        Portfolio Name
                      </label>
                      <Input
                        id="portfolio"
                        className="mt-1 block w-full"
                        aria-label="portfolio name"
                        registration={register('portfolio')}
                      />
                      <div
                        role="alert"
                        aria-label={errors.portfolio?.message}
                        className="mt-4 text-sm font-semibold text-red-500"
                      >
                        {errors.portfolio?.message}
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
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
                          className="mt-1 block w-full pl-7 pr-12"
                          placeholder="0.00"
                          aria-label="deposit amount"
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

                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="depositFrequency"
                        className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
                      >
                        Deposit Frequency
                      </label>
                      <p className="text-sm leading-5 text-zinc-600 dark:text-zinc-500">
                        How often do you want this deposit to be made?
                      </p>
                      <fieldset className="mt-4">
                        <legend className="sr-only ">Deposit Frequency</legend>
                        <div className="space-y-4">
                          {paymentFrequency.map((item) => (
                            <div key={item.id} className="flex items-center">
                              <input
                                id={item.title.toLowerCase()}
                                type="radio"
                                aria-label={item.title}
                                defaultChecked={item.id === 1 ? true : false}
                                value={item.title}
                                className="h-4 w-4 border-zinc-700 text-teal-500 focus:ring-teal-600"
                                {...register('depositFrequency')}
                              />
                              <label
                                htmlFor={item.title}
                                className="ml-3 block text-sm font-medium text-zinc-600 dark:text-zinc-400"
                              >
                                {item.title}
                              </label>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                      <div
                        role="alert"
                        aria-label={errors.depositFrequency?.message}
                        className="mt-4 text-sm font-semibold text-red-500"
                      >
                        {errors.depositFrequency?.message}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 text-right sm:px-6">
                  <Button
                    form="depositPlanForm"
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
        data={depositPlans}
        title="Current Deposit Plans"
        subTitle="A list of all deposit plans added."
        button={
          <Button
            className="w-full flex-none lg:w-20"
            variant="teal"
            onClick={() => router.push('/deposit/fund-deposit')}
            disabled={depositPlans.length === 0}
          >
            Next
          </Button>
        }
        className="mt-8"
        allowDelete={true}
        handleRemove={removeDepositPlan}
      />
    </>
  );
};
