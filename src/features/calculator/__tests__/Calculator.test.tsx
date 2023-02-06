import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalculatorForm } from '../components/CalculatorForm';

const testData = [
  { input: '1 + 1', expected: '2' },
  { input: '2 * 2', expected: '4' },
  { input: '1 + 2 + 3', expected: '6' },
  { input: '6 / 2', expected: '3' },
  { input: '11 + 23', expected: '34' },
  { input: '11.1 + 23', expected: '34.1' },
  { input: '1 + 1 * 3', expected: '4' },
  { input: '( 11.5 + 15.4 ) + 10.1', expected: '37' },
  { input: '23 - ( 29.3 - 12.5 )', expected: '6.2' },
  { input: '( 1 / 2 ) - 1 + 1', expected: '0.5' },
  { input: '10 - ( 2 + 3 * ( 7 - 5 ) )', expected: '2' },
];

const testDataWrongInput = ['1 + )', '1 + - -5', '1>3', '1+3', '11'];

describe.each(testData)(
  'evaluate all valid expressions with the calculator',
  ({ input, expected }) => {
    test('should calculate result after submitting', async () => {
      const user = userEvent.setup();

      render(<CalculatorForm />);

      expect(
        screen.getByRole('textbox', { name: /arithmetic expression/i }),
      ).toBeInTheDocument();

      await user.type(
        screen.getByRole('textbox', { name: /arithmetic expression/i }),
        input,
      );

      expect(
        screen.getByRole('button', { name: /compute/i }),
      ).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: /compute/i }));

      await waitFor(() =>
        expect(screen.queryByText(`Result: ${expected}`)).toBeInTheDocument(),
      );
    });

    test('should clear input and results after clicking on clear', async () => {
      const user = userEvent.setup();

      render(<CalculatorForm />);

      await user.type(
        screen.getByRole('textbox', { name: /arithmetic expression/i }),
        input,
      );

      await user.click(screen.getByRole('button', { name: /compute/i }));

      await waitFor(() =>
        expect(screen.queryByText(`Result: ${expected}`)).toBeInTheDocument(),
      );

      expect(screen.getByLabelText(/arithmetic expression/i)).toHaveValue(
        input,
      );

      expect(
        screen.getByRole('button', { name: /clear/i }),
      ).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: /clear/i }));

      await waitFor(() =>
        expect(
          screen.queryByText(`Result: ${expected}`),
        ).not.toBeInTheDocument(),
      );

      expect(screen.getByLabelText(/arithmetic expression/i)).toHaveValue('');
    });
  },
);

describe.each(testDataWrongInput)('check for input errors', (input) => {
  test('should show error message after submitting', async () => {
    const user = userEvent.setup();

    render(<CalculatorForm />);

    expect(
      screen.getByRole('textbox', { name: /arithmetic expression/i }),
    ).toBeInTheDocument();

    await user.type(
      screen.getByRole('textbox', { name: /arithmetic expression/i }),
      input,
    );

    expect(
      screen.getByRole('button', { name: /compute/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /compute/i }));

    await waitFor(() =>
      expect(screen.queryByText(/invalid expression/i)).toBeInTheDocument(),
    );
  });
});
