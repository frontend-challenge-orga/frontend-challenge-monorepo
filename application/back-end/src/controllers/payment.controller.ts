import { app } from '@config/express.configuration';
import { inputValidation } from '@middlewares/input-validation.middleware';
import { createPaymentSchema, PAYMENT_ENDPOINTS, PROTECTED_ENDPOINTS, SubscriptionDurationType } from '@package/common';
import { type IPaymentService, UnexpectedError } from '@package/domain';
import type { Response, NextFunction } from 'express';
import type { CustomRequest } from '#type';

interface PaymentRequestBody {
  customer_id: string;
  customer_email: string;
  subscription_duration: SubscriptionDurationType;
}

export const setupPaymentController = (paymentService: IPaymentService) => {
  app.post(
    PAYMENT_ENDPOINTS.CREATE_CHECKOUT_SESSION,
    inputValidation(createPaymentSchema),
    async (req: CustomRequest<PaymentRequestBody>, res: Response, next: NextFunction) => {
      try {
        const { customer_id, customer_email, subscription_duration } = req.body;

        const paymentSession = await paymentService.createCheckoutSession({
          customerId: customer_id,
          customerEmail: customer_email,
          subscriptionDuration: subscription_duration,
        });

        res.status(201).json({ url: paymentSession.url });
      } catch (error) {
        next(new UnexpectedError({ detail: error.message }));
      }
    },
  );
};
