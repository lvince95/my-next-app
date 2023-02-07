import { Button, Input } from '../Elements';
import { MailIcon } from '@/icons/MailIcon';
import { z } from 'zod';
import { Form } from '../Form';
import { trpc } from '@/utils/trpc';
import { useNotificationStore } from '@/stores/notifications';

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
});

type NewsletterForm = z.infer<typeof schema>;

export const Newsletter = () => {
  const { addNotification } = useNotificationStore();

  const addNewsletter = trpc.newsletter.add.useMutation({
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: 'Success!',
        message: 'You have been subscribed to our newsletter.',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Failed',
        message: error.message.includes('Unique constraint')
          ? 'The entered email address is already subscribed to the newsletter.'
          : error.message,
      });
    },
  });

  const submitHandler = (data: NewsletterForm) => {
    console.log(addNewsletter.mutate(data));
  };

  return (
    <>
      <Form<NewsletterForm, typeof schema>
        className="rounded-2xl border border-zinc-100 p-6 shadow dark:border-zinc-700/40"
        onSubmit={submitHandler}
        schema={schema}
      >
        {({ register, formState: { errors } }) => (
          <>
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <MailIcon className="h-6 w-6 flex-none" />
              <span className="ml-3">Stay up to date</span>
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Get notified when I publish something new, and unsubscribe at any
              time.
            </p>
            <div className="mt-6 flex">
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
                registration={register('email')}
              />

              <Button
                isLoading={addNewsletter.isLoading}
                disabled={addNewsletter.isLoading}
                type="submit"
                className="ml-4 flex-none"
              >
                Join
              </Button>
            </div>
            <div
              role="alert"
              aria-label={errors.email?.message}
              className="mt-4 text-sm font-semibold text-red-500"
            >
              {errors.email?.message}
            </div>
          </>
        )}
      </Form>
    </>
  );
};
