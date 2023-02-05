import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Container } from '@/components/Layout/Container';

test('should render itself and its children', async () => {
  const user = userEvent.setup();
  render(
    <Container>
      <button>Submit</button>
      <label htmlFor="test">Test</label>
      <input name="test" aria-label="test" />
    </Container>,
  );

  expect(
    screen.getByRole('button', {
      name: /Submit/i,
    }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole('textbox', {
      name: /Test/i,
    }),
  ).toBeInTheDocument();
});
