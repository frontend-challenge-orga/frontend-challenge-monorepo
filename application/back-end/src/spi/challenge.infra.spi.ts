import { ChallengeSpi } from '@package/domain';
import { PrismaClient } from '@prisma/client';

export class ChallengeInfraSpi implements ChallengeSpi {
  private challengeRepository: PrismaClient;

  constructor(dataSource: PrismaClient) {
    this.challengeRepository = dataSource;
  }

  async index() {
    return this.challengeRepository.challenge.findMany();
  }
}
