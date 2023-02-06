import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/Elements';

test('should render a clickable button', async () => {
  const user = userEvent.setup();
  const handleSubmit = jest.fn();

  render(
    <Button className="w-full flex-none lg:w-20" onClick={handleSubmit}>
      Click Me
    </Button>,
  );

  expect(
    screen.getByRole('button', {
      name: /click me/i,
    }),
  ).toBeInTheDocument();

  user.click(screen.getByRole('button', { name: /click me/i }));

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalledWith(expect.anything()),
  );
});

test('should render a form submit button', async () => {
  const user = userEvent.setup();
  const handleSubmit = jest.fn((e) => e.preventDefault());

  render(
    <form id="testForm" onSubmit={handleSubmit}>
      <Button
        type="submit"
        form="testForm"
        className="w-full flex-none lg:w-20"
      >
        Submit
      </Button>
    </form>,
  );

  expect(
    screen.getByRole('button', {
      name: /Submit/i,
    }),
  ).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalledWith(expect.anything()),
  );
});
