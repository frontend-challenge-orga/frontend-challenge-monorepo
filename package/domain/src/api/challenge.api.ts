import { Challenge } from '../entities/challenge.entity';

export interface ChallengeApi {
  getChallenges(): Promise<Challenge[]>;
}
