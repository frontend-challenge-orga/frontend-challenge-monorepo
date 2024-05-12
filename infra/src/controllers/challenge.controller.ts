import { ChallengeApi } from '@monorepo/domain';
import { app } from '../configuration/express.configuration';
import { CHALLENGE_ENDPOINTS } from '@monorepo/packages';
import type { Response } from 'express';

export const ChallengeController = (challengeApi: ChallengeApi) => {
  app.get(CHALLENGE_ENDPOINTS.CHALLENGES, async (_, res: Response) => {
    try {
      const challenges = await challengeApi.getChallenges();
      res.status(200).json(challenges);
    } catch (error) {
      console.error(error);
    }
  });
};
