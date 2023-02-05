import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import { DepositPlanForm } from '../components/DepositPlanForm';

const testDepositPlans = {
  id: 'test',
  portfolio: 'High risk',
  amount: 1000,
  depositFrequency: 'One-Time',
};

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();

test('should render the form and accept inputs', async () => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {},
    push: pushMock,
  });

  const user = userEvent.setup();

  render(
    <>
      <DepositPlanForm />
    </>,
  );

  expect(screen.queryByText(/0 items found/i)).toBeInTheDocument();

  expect(
    screen.getByRole('textbox', {
      name: /portfolio name/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole('textbox', {
      name: /amount/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole('radio', {
      name: /one-time/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole('radio', {
      name: /one-time/i,
    }),
  ).toBeChecked();

  expect(
    screen.getByRole('radio', {
      name: /monthly/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole('button', {
      name: /add/i,
    }),
  ).toBeInTheDocument();

  await user.type(
    screen.getByRole('textbox', { name: /portfolio name/i }),
    testDepositPlans.portfolio,
  );

  await user.type(
    screen.getByRole('textbox', { name: /amount/i }),
    testDepositPlans.amount.toString(),
  );

  await user.click(screen.getByRole('radio', { name: /monthly/i }));

  await user.click(screen.getByRole('button', { name: /add/i }));

  await waitFor(() =>
    expect(screen.queryByText(/1 item added/i)).toBeInTheDocument(),
  );
});
