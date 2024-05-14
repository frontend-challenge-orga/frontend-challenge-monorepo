import { ChallengeApi } from '@package/domain';
import { CHALLENGE_ENDPOINTS, CHALLENGE_ERRORS, PROTECTED_ENDPOINTS } from '@package/common';
import { app } from '@config/express.configuration';
import { CustomError } from '@errors/custom.error';
import type { Response, NextFunction } from 'express';

export const ChallengeController = (challengeApi: ChallengeApi) => {
  app.get(
    PROTECTED_ENDPOINTS.AUTHENTICATED_ROUTE + CHALLENGE_ENDPOINTS.GET_CHALLENGES,
    async (_, res: Response, next: NextFunction) => {
      try {
        const challenges = await challengeApi.getChallenges();
        res.status(200).json(challenges);
      } catch (error) {
        next(new CustomError(CHALLENGE_ERRORS.GET_CHALLENGES, 500));
      }
    },
  );
};