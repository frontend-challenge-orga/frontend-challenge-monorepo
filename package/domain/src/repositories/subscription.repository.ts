import type { Subscription } from '../entities';

export interface ISubscriptionRepository {
  getSubscriptions(): Promise<Subscription[]>;
  getSubscription(userId: string): Promise<Subscription | null>;
  createSubscription(subscription: Subscription): Promise<Subscription>;
  updateSubscription(userId: string, subscription: Subscription): Promise<Subscription>;
  cancelSubscription(userId: string): Promise<Subscription>;
}
