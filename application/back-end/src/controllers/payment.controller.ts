import { app } from '@config/express.configuration';
import { inputValidation } from '@middlewares/input-validation.middleware';
import { createPaymentSchema, PAYMENT_ENDPOINTS, PROTECTED_ENDPOINTS, SubscriptionDurationType } from '@package/common';
/*import { type IPaymentService, UnexpectedError } from '@package/domain';*/
import { IPaymentService } from '@package/domain';
import { UnexpectedError } from '#errors';
import type { Response, NextFunction } from 'express';
import type { CustomRequest } from '#type';

interface PaymentRequestBody {
  customer_id: string;
  customer_email: string;
  subscription_duration: SubscriptionDurationType;
}

export const setupPaymentController = (paymentService: IPaymentService) => {
  app.post(
    PROTECTED_ENDPOINTS.AUTHENTICATED_ROUTE + PAYMENT_ENDPOINTS.CREATE_CHECKOUT_SESSION,
    inputValidation(createPaymentSchema),
    async (req: CustomRequest<PaymentRequestBody>, res: Response, next: NextFunction) => {
      try {
        const { customer_id, customer_email, subscription_duration } = req.body;

        const paymentSession = await paymentService.createCheckoutSession(
          customer_id,
          customer_email,
          subscription_duration,
        );

        res.json({ url: paymentSession.url });
      } catch (error) {
        next(new UnexpectedError({ detail: error.message }));
      }
    },
  );
};
