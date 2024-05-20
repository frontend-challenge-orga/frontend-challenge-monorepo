import type { IPaymentRepository } from '../repositories';
import type { SubscriptionDurationType } from '@package/common';

export interface IPaymentService {
  createCheckoutSession(
    customerId: string,
    customerEmail: string,
    subscriptionDuration: SubscriptionDurationType,
  ): Promise<{
    url: string;
  }>;
}

export class PaymentService implements IPaymentService {
  constructor(private paymentRepository: IPaymentRepository) {}

  async createCheckoutSession(customerId: string, customerEmail: string, subscriptionDuration: 'MONTHLY' | 'YEARLY') {
    const checkout_session = await this.paymentRepository.createCheckoutSession(
      customerId,
      customerEmail,
      subscriptionDuration,
    );

    return { url: checkout_session.url };
  }
}
