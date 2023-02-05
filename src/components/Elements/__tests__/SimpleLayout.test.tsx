import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { SimpleLayout, SimpleLayoutWithBackButton } from '@/components/Layout';

const titleText = 'Test Title';
const introText = 'Test intro';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();

test('should render the title and intro', async () => {
  render(<SimpleLayout title={titleText} intro={introText} />);

  expect(screen.queryByText(titleText)).toBeInTheDocument();

  expect(screen.queryByText(introText)).toBeInTheDocument();
});

test('should render the title, intro, and back link', async () => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {},
    push: pushMock,
  });

  render(<SimpleLayoutWithBackButton title={titleText} intro={introText} />);

  expect(screen.queryByText(titleText)).toBeInTheDocument();

  expect(screen.queryByText(introText)).toBeInTheDocument();

  expect(screen.queryByText(/back/i)).toBeInTheDocument();
});
