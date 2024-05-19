import type { ISubscriptionRepository } from '@package/domain/dist/src/repositories/subscription.repository';
import type { PrismaClient } from '@prisma/client';
import type { Subscription } from '@package/domain';

export class SubscriptionRepository implements ISubscriptionRepository {
  private subscriptionRepository: PrismaClient;

  constructor(dataSource: PrismaClient) {
    this.subscriptionRepository = dataSource;
  }

  async getSubscriptions() {
    return this.subscriptionRepository.subscription.findMany();
  }

  async getSubscription(userId: string) {
    return this.subscriptionRepository.subscription.findUnique({
      where: {
        userId,
      },
    });
  }

  async createSubscription(data: Subscription) {
    return this.subscriptionRepository.subscription.create({
      data,
    });
  }

  async updateSubscription(userId: string) {
    return this.subscriptionRepository.subscription.update({
      where: {
        userId,
      },

      data: {
        subscribed: true,
      },
    });
  }

  async cancelSubscription(userId: string) {
    return this.subscriptionRepository.subscription.delete({
      where: {
        userId,
      },
    });
  }
}
