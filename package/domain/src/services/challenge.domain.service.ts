import type { Challenge } from '../entities/challenge.entity';
import type { IChallengeRepository } from '../repositories';

export class ChallengeDomainService implements IChallengeRepository {
  constructor(private challengeRepository: IChallengeRepository) {
    this.challengeRepository = challengeRepository;
  }

  async getChallenges(): Promise<Challenge[]> {
    return this.challengeRepository.getChallenges();
  }
}
