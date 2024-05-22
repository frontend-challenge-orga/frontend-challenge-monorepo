import type { IPaymentRepository } from '../repositories';
import type { CreateCheckoutSession, PaymentSubscription, PaymentSubscriptionStatus } from '../entities';

export interface IPaymentService {
  createCheckoutSession(createCheckoutSession: CreateCheckoutSession): Promise<{
    url: string;
  }>;
  getSubscription(subscriptionId: string): Promise<PaymentSubscription>;
  getSubscriptionStatus(subscriptionId: string): Promise<PaymentSubscriptionStatus>;
  suspendSubscription(userId: string): Promise<void>;
}

export class PaymentService implements IPaymentService {
  constructor(private paymentRepository: IPaymentRepository) {}

  async createCheckoutSession(createCheckoutSession: CreateCheckoutSession) {
    const checkout_session = await this.paymentRepository.createCheckoutSession(createCheckoutSession);

    return { url: checkout_session.url };
  }

  async getSubscription(subscriptionId: string) {
    return await this.paymentRepository.getSubscription(subscriptionId);
  }

  async getSubscriptionStatus(subscriptionId: string) {
    return await this.paymentRepository.getSubscriptionStatus(subscriptionId);
  }

  async suspendSubscription(userId: string) {
    await this.paymentRepository.suspendSubscription(userId);
  }
}
