import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { prisma } from '@/server/prisma';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';

const defaultNewsletterSelect = Prisma.validator<Prisma.NewsletterSelect>()({
  email: true,
});

export const newsletterRouter = router({
  byEmail: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .query(async ({ input }) => {
      const { email } = input;
      const response = await prisma.newsletter.findUnique({
        where: { email },
        select: defaultNewsletterSelect,
      });
      if (!response) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `'${email}' not found`,
        });
      }
      return response;
    }),
  add: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ input }) => {
      const email = await prisma.newsletter.create({
        data: input,
        select: defaultNewsletterSelect,
      });
      return email;
    }),
});
