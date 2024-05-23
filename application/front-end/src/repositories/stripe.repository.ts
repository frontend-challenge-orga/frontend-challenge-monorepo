import { IHttpRepository, IPaymentRepository } from '@domain/repositories';
import { PAYMENT_ENDPOINTS } from '@package/common';
import { httpAxios } from '#/instances/axios.instance';
import { CreateCheckoutSession } from '@domain/entities';

export class StripeRepository {
  private readonly http: IHttpRepository;

  constructor(http: IHttpRepository) {
    this.http = http;
  }

  async createCheckoutSession(
    customer_id: string,
    customer_email: string,
    subscription_duration: string,
  ): Promise<string> {
    // Call Stripe API to create a checkout session
    const checkoutSession = await this.http.post<{ url: string }>(PAYMENT_ENDPOINTS.CREATE_CHECKOUT_SESSION, {
      customer_id,
      customer_email,
      subscription_duration,
    });

    return checkoutSession.url;
  }
}

const stripeRepository = new StripeRepository(httpAxios);

export { stripeRepository };
