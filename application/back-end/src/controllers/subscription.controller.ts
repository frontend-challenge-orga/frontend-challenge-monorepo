import { app } from '@config/express.configuration';
import { inputValidation } from '@middlewares/input-validation.middleware';
import { SUBSCRIPTION_ENDPOINTS, suspendSubscriptionSchema } from '@package/common';
import { CustomRequest } from '#type';
import { ISubscriptionService, CustomError, UnexpectedError, httpStatus } from '@package/domain';
import type { SuspendSubscription } from '@use-cases/suspend-subscription';
import type { Response, NextFunction } from 'express';

interface SuspendSubscriptionRequestBody {
  userId: string;
}

export const setupSubscriptionController = (
  subscriptionService: ISubscriptionService,
  suspendSubscription: SuspendSubscription,
) => {
  app.post(
    SUBSCRIPTION_ENDPOINTS.SUSPEND_SUBSCRIPTION,
    inputValidation(suspendSubscriptionSchema),
    async (req: CustomRequest<SuspendSubscriptionRequestBody>, res: Response, next: NextFunction) => {
      try {
        const { userId } = req.body;

        const subscription = await suspendSubscription.do(userId);

        res.status(httpStatus.CREATED).json(subscription);
      } catch (error) {
        if (error instanceof CustomError) {
          next(error);
          return;
        }

        next(new UnexpectedError());
      }
    },
  );
};
