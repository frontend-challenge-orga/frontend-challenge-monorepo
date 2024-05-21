import type { Challenge } from '../entities';
import { CustomError } from '../error';
import type { IChallengeRepository } from '../repositories';

export interface IChallengeService {
  getChallenges: () => Promise<Challenge[] | CustomError>;
  createChallenge: (challenge: Challenge) => Promise<Challenge>;
}

export class ChallengeService implements IChallengeService {
  constructor(private challengeRepository: IChallengeRepository) {}

  getChallenges = async () => {
    try {
      return await this.challengeRepository.getChallenges();
    } catch (error) {
      return new CustomError({ message: 'Failed to get challenges' });
    }
  };

  async createChallenge(challenge: Challenge): Promise<Challenge> {
    return this.challengeRepository.createChallenge(challenge);
  }
}
