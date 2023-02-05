import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/Elements';

const input = 'Testing Input';

test('should render an input', async () => {
  const user = userEvent.setup();

  render(
    <>
      <label htmlFor="test input">Test Input</label>
      <Input id="test" name="test input" aria-label="test input" />
    </>,
  );

  expect(
    screen.getByRole('textbox', {
      name: /test input/i,
    }),
  ).toBeInTheDocument();

  await user.type(screen.getByRole('textbox', { name: /test input/i }), input);

  await waitFor(() =>
    expect(screen.getByLabelText(/test input/i)).toHaveValue(input),
  );
});
