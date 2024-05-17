import { app } from '@config/express.configuration';
import { inputValidation } from '@middlewares/input-validation.middleware';
import { UnexpectedError } from '#error';
import { CHALLENGE_ENDPOINTS, createChallengeSchema } from '@package/common';
import type { IChallengeService } from '@package/domain';
import type { Response, NextFunction } from 'express';

export const setupChallengeController = (challengeService: IChallengeService) => {
  app.get(CHALLENGE_ENDPOINTS.GET_CHALLENGES, async (_, res: Response, next: NextFunction) => {
    try {
      const challenges = await challengeService.getChallenges();
      res.status(200).json(challenges);
    } catch (error) {
      next(new UnexpectedError());
    }
  });

  app.post(
    CHALLENGE_ENDPOINTS.CREATE_CHALLENGE,
    inputValidation(createChallengeSchema),
    async (req, res: Response, next: NextFunction) => {
      try {
        const challenge = await challengeService.createChallenge(req.body);
        res.status(201).json(challenge);
      } catch (error) {
        next(new UnexpectedError());
      }
    },
  );
};
