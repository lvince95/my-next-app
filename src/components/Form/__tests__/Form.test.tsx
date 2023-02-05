import * as z from 'zod';
import { Button } from '@/components/Elements';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/Elements';
import { Form } from '../Form';

const testData = {
  title: 'Hello World',
};

const schema = z.object({
  title: z.string().min(1, 'Required'),
});

test('should render and submit a basic Form component', async () => {
  const handleSubmit = jest.fn();
  const user = userEvent.setup();

  render(
    <Form<typeof testData, typeof schema>
      onSubmit={handleSubmit}
      schema={schema}
      id="test-form"
    >
      {({ register }) => (
        <>
          <label htmlFor="title">Title</label>
          <Input
            id="title"
            name="title"
            aria-label="title"
            registration={register('title')}
          />
          <Button
            name="submit"
            form="test-form"
            type="submit"
            className="w-full"
          >
            Submit
          </Button>
        </>
      )}
    </Form>,
  );

  expect(
    screen.getByRole('textbox', {
      name: /title/i,
    }),
  ).toBeInTheDocument();

  await userEvent.type(screen.getByLabelText(/title/i), testData.title);

  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalledWith(testData, expect.anything()),
  );
});

test('should fail submission if validation fails', async () => {
  const handleSubmit = jest.fn();

  render(
    <Form<typeof testData, typeof schema>
      onSubmit={handleSubmit}
      schema={schema}
      id="test-form"
    >
      {({ register, formState: { errors } }) => (
        <>
          <label htmlFor="title">title</label>
          <Input
            id="test"
            name="title"
            aria-label="title"
            registration={register('title')}
          />
          <Button
            name="submit"
            form="test-form"
            type="submit"
            className="w-full"
          >
            Submit
          </Button>
          <div role="alert" aria-label={errors.title?.message} className="mt-4">
            {errors.title?.message}
          </div>
        </>
      )}
    </Form>,
  );

  expect(
    screen.getByRole('textbox', {
      name: /title/i,
    }),
  ).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await screen.findByRole(/alert/i, { name: /required/i });

  expect(handleSubmit).toHaveBeenCalledTimes(0);
});
