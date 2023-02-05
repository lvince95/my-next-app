import { Button } from '@/components/Elements/Button';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DepositDataTable } from '../components/DepositDataTable';

const testDepositPlans = [
  {
    id: 'test',
    portfolio: 'High risk',
    amount: 1000,
    depositFrequency: 'One-Time',
  },
];

test('should render and display the data given and have clickable buttons', async () => {
  const user = userEvent.setup();
  const handleRemove = jest.fn();
  const handleNext = jest.fn();

  render(
    <>
      <DepositDataTable
        data={testDepositPlans}
        title="Test"
        subTitle="Subtest"
        button={
          <Button
            className="w-full flex-none lg:w-20"
            variant="teal"
            onClick={handleNext}
          >
            Next
          </Button>
        }
        className="mt-8"
        allowDelete={true}
        handleRemove={handleRemove}
      />
    </>,
  );

  expect(
    screen.getByRole('heading', {
      name: /test/i,
    }),
  ).toBeInTheDocument();

  expect(screen.queryByText(/subtest/i)).toBeInTheDocument();

  expect(
    screen.getByRole('button', {
      name: /next/i,
    }),
  ).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /next/i }));

  await waitFor(() =>
    expect(handleNext).toHaveBeenCalledWith(expect.anything()),
  );

  expect(screen.queryByText(/1 item added/i)).toBeInTheDocument();
});
