import { ChallengeApi } from '@monorepo/domain';
import { app } from '../configuration/express.configuration';
import type { Response } from 'express';

export const ChallengeController = (challengeApi: ChallengeApi) => {
  app.get('/challenges', async (_, res: Response) => {
    try {
      const challenges = await challengeApi.getChallenges();
      res.json(challenges);
    } catch (error) {
      console.error(error);
    }
  });
};
