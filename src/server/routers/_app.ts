/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { newsletterRouter } from './newsletter';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  newsletter: newsletterRouter,
});

export type AppRouter = typeof appRouter;
