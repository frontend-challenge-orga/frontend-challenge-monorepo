import type { ChallengeApi } from '../api';
import type { ChallengeSpi } from '../spi';
import type { Challenge } from '../entities/challenge.entity';

export class ChallengeDomainService implements ChallengeApi {
  constructor(private challengeSpi: ChallengeSpi) {
    this.challengeSpi = challengeSpi;
  }

  async getChallenges(): Promise<Challenge[]> {
    return this.challengeSpi.index();
  }
}
