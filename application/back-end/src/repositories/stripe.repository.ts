import type { IPaymentRepository } from '@package/domain';
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

  async createCheckoutSession(
    customerId: string,
    customerEmail: string,
    subscriptionDuration: 'MONTHLY' | 'YEARLY',
  ): Promise<Stripe.Checkout.Session> {
    return await this.paymentRepository.checkout.sessions.create({
      line_items: [
        {
          price: this.getStripePriceIdBySubscriptionDuration('MONTHLY'),
          quantity: 1,
        },
      ],

      subscription_data: {
        metadata: {
          userID: customerId,
          customer_email: customerEmail,
          subscription_duration: subscriptionDuration,
        },
      },

      mode: 'subscription',
      customer_email: customerEmail,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });
  }
}
