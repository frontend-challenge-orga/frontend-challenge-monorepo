import type { IChallengeRepository } from '@package/domain';
import type { Challenge } from '@package/domain';
import type { PrismaClient } from '@prisma/client';

export class ChallengeRepository implements IChallengeRepository {
  private challengeRepository: PrismaClient;

  constructor(dataSource: PrismaClient) {
    this.challengeRepository = dataSource;
  }

  async getChallenges() {
    return this.challengeRepository.challenge.findMany();
  }

  async createChallenge(data: Challenge) {
    return this.challengeRepository.challenge.create({
      data,
    });
  }
}
