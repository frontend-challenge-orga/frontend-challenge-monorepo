import type { Challenge } from '../entities/challenge.entity';
import type { IChallengeRepository } from '../repositories';

export interface IChallengeService {
  getChallenges: () => Promise<Challenge[]>;
  createChallenge: (challenge: Challenge) => Promise<Challenge>;
}

export class ChallengeService implements IChallengeService {
  constructor(private challengeRepository: IChallengeRepository) {}

  async getChallenges(): Promise<Challenge[]> {
    return this.challengeRepository.getChallenges();
  }

  async createChallenge(challenge: Challenge): Promise<Challenge> {
    return this.challengeRepository.createChallenge(challenge);
  }
}
