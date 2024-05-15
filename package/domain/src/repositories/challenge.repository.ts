import { Challenge } from '../entities/challenge.entity';

export interface IChallengeRepository {
  getChallenges(): Promise<Challenge[]>;
  createChallenge(challenge: Challenge): Promise<Challenge>;
}
