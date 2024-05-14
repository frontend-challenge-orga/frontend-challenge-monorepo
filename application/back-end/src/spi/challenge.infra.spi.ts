import { ChallengeRepository, ChallengeSpi } from '@package/domain';
import { PrismaClient } from '@prisma/client';

export class ChallengeInfraSpi implements ChallengeRepository {
  private challengeRepository: PrismaClient;

  constructor(dataSource: PrismaClient) {
    this.challengeRepository = dataSource;
  }

  async getChallenges() {
    return this.challengeRepository.challenge.findMany();
  }
}
