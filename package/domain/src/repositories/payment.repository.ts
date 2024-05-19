export interface IPaymentRepository {
  createCheckoutSession(
    customerId: string,
    customerEmail: string,
    subscriptionDuration: 'MONTHLY' | 'YEARLY',
  ): Promise<{
    url: string;
  }>;
}
