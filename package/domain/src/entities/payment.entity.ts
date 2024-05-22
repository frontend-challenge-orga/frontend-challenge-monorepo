import { SubscriptionDurationType } from '@package/common';

export class PaymentSubscription {
  readonly id: string;
  readonly object: 'subscription';
  readonly cancel_at: number | null;
  readonly cancel_at_period_end: boolean;
  readonly canceled_at: number | null;
  readonly status: PaymentSubscriptionStatus;

  constructor(
    id: string,
    object: 'subscription',
    cancel_at: number | null,
    cancel_at_period_end: boolean,
    canceled_at: number | null,
    status: PaymentSubscriptionStatus,
  ) {
    this.id = id;
    this.object = object;
    this.cancel_at = cancel_at;
    this.cancel_at_period_end = cancel_at_period_end;
    this.canceled_at = canceled_at;
    this.status = status;
  }
}

export type CreateCheckoutSession = {
  readonly customerId: string;
  readonly customerEmail: string;
  readonly subscriptionDuration: SubscriptionDurationType;
};

export type PaymentSubscriptionStatus =
  | 'active'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'past_due'
  | 'paused'
  | 'trialing'
  | 'unpaid';
