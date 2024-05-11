import { Challenge } from '../entities/challenge.entity';

export interface ChallengeSpi {
  index(): Promise<Challenge[]>;
}
