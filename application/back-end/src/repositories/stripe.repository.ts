import type { CreateCheckoutSession, IPaymentRepository } from '@package/domain';
import type Stripe from 'stripe';

export class StripeRepository implements IPaymentRepository {
  private paymentRepository: Stripe;

  constructor(dataSource: Stripe) {
    this.paymentRepository = dataSource;
  }

  private getStripePriceIdBySubscriptionDuration(subscriptionDuration: 'MONTHLY' | 'YEARLY') {
    return subscriptionDuration === 'MONTHLY'
      ? process.env.STRIPE_MONTHLY_SUBSCRIPTION_PRICE_ID
      : process.env.STRIPE_YEARLY_SUBSCRIPTION_PRICE_ID;
  }

  async createCheckoutSession(createCheckoutSession: CreateCheckoutSession): Promise<Stripe.Checkout.Session> {
    return await this.paymentRepository.checkout.sessions.create({
      line_items: [
        {
          price: this.getStripePriceIdBySubscriptionDuration('MONTHLY'),
          quantity: 1,
        },
      ],

      subscription_data: {
        metadata: {
          userID: createCheckoutSession.customerId,
          customer_email: createCheckoutSession.customerEmail,
          subscription_duration: createCheckoutSession.subscriptionDuration,
        },
      },

      mode: 'subscription',
      customer_email: createCheckoutSession.customerEmail,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });
  }

  async getSubscription(userId: string): Promise<Stripe.Response<Stripe.Subscription>> {
    return await this.paymentRepository.subscriptions.retrieve(userId);
  }

  async getSubscriptionStatus(subscriptionId: string): Promise<Stripe.Subscription.Status> {
    const subscription = await this.getSubscription(subscriptionId);
    return subscription.status;
  }

  async suspendSubscription(subscriptionId: string): Promise<Stripe.Response<Stripe.Subscription>> {
    return await this.paymentRepository.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
  }
}
