import type { ISubscriptionRepository } from '../repositories/subscription.repository';
import type { Subscription } from '../entities';

export interface ISubscriptionService {
  getSubscriptions: () => Promise<Subscription[]>;
  getSubscription: (userId: string) => Promise<Subscription | null>;
  createSubscription: (subscription: Subscription) => Promise<Subscription>;
  updateSubscription: (userId: string, subscription: Subscription) => Promise<Subscription>;
  cancelSubscription: (userId: string) => Promise<Subscription>;
}

export class SubscriptionService implements ISubscriptionService {
  constructor(private readonly subscriptionRepository: ISubscriptionRepository) {}

  async getSubscriptions(): Promise<Subscription[]> {
    return this.subscriptionRepository.getSubscriptions();
  }

  async getSubscription(userId: string): Promise<Subscription | null> {
    return this.subscriptionRepository.getSubscription(userId);
  }

  async createSubscription(subscription: Subscription): Promise<Subscription> {
    return this.subscriptionRepository.createSubscription(subscription);
  }

  async updateSubscription(userId: string, subscription: Subscription): Promise<Subscription> {
    return this.subscriptionRepository.updateSubscription(userId, subscription);
  }

  async cancelSubscription(userId: string): Promise<Subscription> {
    return this.subscriptionRepository.cancelSubscription(userId);
  }
}
