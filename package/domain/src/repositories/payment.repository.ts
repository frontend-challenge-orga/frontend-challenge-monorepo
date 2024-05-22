import { PaymentSubscription, PaymentSubscriptionStatus, CreateCheckoutSession } from '../entities';

export interface IPaymentRepository {
  createCheckoutSession(createCheckoutSession: CreateCheckoutSession): Promise<{
    url: string;
  }>;

  getSubscription(subscriptionId: string): Promise<PaymentSubscription>;
  getSubscriptionStatus(subscriptionId: string): Promise<PaymentSubscriptionStatus>;
  suspendSubscription(subscriptionId: string): Promise<PaymentSubscription>;
}
