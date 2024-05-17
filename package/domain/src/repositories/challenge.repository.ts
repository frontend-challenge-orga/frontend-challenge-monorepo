import { Challenge } from '../entities';

export interface IChallengeRepository {
  getChallenges(): Promise<Challenge[]>;
  createChallenge(challenge: Challenge): Promise<Challenge>;
}
