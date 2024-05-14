import { Challenge } from '../entities/challenge.entity';

export interface ChallengeRepository {
  getChallenges(): Promise<Challenge[]>;
}
