import clsx from 'clsx';
import { OperatorCards } from './OperatorCards';

type CalculationResultProps = {
  result?: number;
  operations: string[];
  operators: string[];
};

export const CalculationResult = ({
  result,
  operations,
  operators,
}: CalculationResultProps) => {
  return (
    <div className="mt-4 flex flex-col gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
      <div className="mt-4 flex flex-col rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <p className="mx-auto text-xl sm:mx-0">Result: {result}</p>
      </div>
      <div className="mt-4 flex flex-col rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Order of Operations{' '}
                <span className="text-zinc-600 dark:text-zinc-400">
                  - {operations.length}{' '}
                  {operations.length === 1 ? 'operation' : 'operations'}{' '}
                  performed
                </span>
              </h1>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                A list of all operations performed, ordered by their execution
                order.
              </p>
              <OperatorCards operators={operators} />
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    {operations.length > 0 && (
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-100 sm:pl-6 md:pl-0"
                        >
                          First Number
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 px-3 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-100"
                        >
                          Operator
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 px-3 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-100"
                        >
                          Second Number
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 px-3 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-100"
                        />
                        <th
                          scope="col"
                          className="py-3.5 px-3 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-100"
                        >
                          Result
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    )}
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {operations.map((expression, index) => {
                      const tokens = expression.split(/\s+/);

                      return (
                        <tr key={index}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-zinc-600 dark:text-zinc-400 sm:pl-6 md:pl-0">
                            {tokens[0]}
                          </td>
                          <td className="whitespace-nowrap py-4 px-3 text-sm text-zinc-600 dark:text-zinc-400">
                            {tokens[1]}
                          </td>
                          <td className="whitespace-nowrap py-4 px-3 text-sm text-zinc-600 dark:text-zinc-400">
                            {tokens[2]}
                          </td>
                          <td className="whitespace-nowrap py-4 px-3 text-sm text-zinc-600 dark:text-zinc-400">
                            {tokens[3]}
                          </td>
                          <td
                            className={clsx(
                              `${
                                index === operations.length - 1
                                  ? 'font-bold text-zinc-900 dark:text-zinc-100'
                                  : 'text-zinc-600 dark:text-zinc-400'
                              }`,
                              'whitespace-nowrap py-4 px-3 text-sm',
                            )}
                          >
                            {tokens[4]}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
