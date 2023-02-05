import Calculator from '@/pages/calculator';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

describe.each(testData)(
  'evaluate all expressions with the basic calculator',
  ({ input, expected }) => {
    test('should render an input, compute button, and clear button', async () => {
      render(<Calculator />);

      expect(
        screen.getByRole('heading', {
          name: /calculator/i,
        }),
      ).toBeInTheDocument();

      expect(
        screen.getByRole('textbox', { name: /arithmetic expression/i }),
      ).toBeInTheDocument();

      expect(
        screen.getByRole('button', { name: /compute/i }),
      ).toBeInTheDocument();

      expect(
        screen.getByRole('button', { name: /clear/i }),
      ).toBeInTheDocument();
    });

    test('should calculate after submitting', async () => {
      const user = userEvent.setup();

      render(<Calculator />);

      await user.type(
        screen.getByRole('textbox', { name: /arithmetic expression/i }),
        input,
      );

      await user.click(screen.getByRole('button', { name: /compute/i }));

      await waitFor(() =>
        expect(screen.queryByText(`Result: ${expected}`)).toBeInTheDocument(),
      );
    });

    test('should clear input and results after clearing', async () => {
      const user = userEvent.setup();

      render(<Calculator />);

      await user.click(screen.getByRole('button', { name: /clear/i }));

      await waitFor(() =>
        expect(
          screen.queryByText(`Result: ${expected}`),
        ).not.toBeInTheDocument(),
      );
    });
  },
);
