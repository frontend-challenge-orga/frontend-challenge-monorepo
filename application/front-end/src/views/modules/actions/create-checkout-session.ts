'use server';

import * as z from 'zod';
import { ServerActionError, userAction } from '#/config/libs/next-safe-action';
import { ACTION_ERROR } from '#/config/constants';
import { stripeRepository } from '#/repositories/stripe.repository';
import { PaymentService } from '@domain/services';

const schema = z.object({
  subscription_duration: z.enum(['MONTHLY', 'YEARLY']),
});

export const createCheckoutSessionAction = userAction(
  schema,
  async ({ subscription_duration }, { userId, userEmail, accessToken }) => {
    try {
      return await stripeRepository.createCheckoutSession(userId, userEmail, subscription_duration);
    } catch (error) {
      throw new ServerActionError(ACTION_ERROR.CREATE_CHECKOUT_SESSION);
    }
  },
);
