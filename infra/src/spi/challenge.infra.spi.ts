import { ChallengeSpi } from '@monorepo/domain';
import prisma from '../configuration/prisma.configuration';

export class ChallengeInfraSpi implements ChallengeSpi {
  async index() {
    return prisma.challenge.findMany();
  }
}
