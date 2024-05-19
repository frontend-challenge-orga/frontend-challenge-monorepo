import type { SubscriptionDurationType } from '@package/common';

export class Subscription {
  readonly id: number;
  readonly subscribed: boolean;
  readonly subscription_id: string;
  readonly subscription_duration: SubscriptionDurationType;
  readonly subscribed_at: Date;
  readonly subscription_end_at: Date;
  readonly subscription_cancelled_at: Date | null;
  readonly userId: string;

  constructor(
    id: number,
    subscribed: boolean,
    subscription_id: string,
    subscription_duration: SubscriptionDurationType,
    subscribed_at: Date,
    subscription_end_at: Date,
    subscription_cancelled_at: Date | null,
    userId: string,
  ) {
    this.id = id;
    this.subscribed = subscribed;
    this.subscription_id = subscription_id;
    this.subscription_duration = subscription_duration;
    this.subscribed_at = subscribed_at;
    this.subscription_end_at = subscription_end_at;
    this.subscription_cancelled_at = subscription_cancelled_at;
    this.userId = userId;
  }
}
