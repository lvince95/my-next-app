import { render, screen } from '@testing-library/react';
import { Container } from '@/components/Layout/Container';

test('should render itself and its children', async () => {
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
