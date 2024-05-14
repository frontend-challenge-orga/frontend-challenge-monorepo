import type { ChallengeApi } from '../api';
import type { ChallengeSpi } from '../spi';
import type { Challenge } from '../entities/challenge.entity';
import { ChallengeRepository } from '../repositories/challenge.repository';

export class ChallengeDomainService implements ChallengeRepository {
  constructor(private challengeRepository: ChallengeRepository) {
    this.challengeRepository = challengeRepository;
  }

  async getChallenges(): Promise<Challenge[]> {
    return this.challengeRepository.getChallenges();
  }
}
