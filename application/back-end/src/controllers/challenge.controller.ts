import { app } from '@config/express.configuration';
import { inputValidation } from '@middlewares/input-validation.middleware';
import { UnexpectedError } from '#error';
import { CHALLENGE_ENDPOINTS, createChallengeSchema } from '@package/common';
import type { IChallengeService } from '@package/domain';
import type { Request, Response, NextFunction } from 'express';
import { ChallengeController } from './sandbox';

export const setupChallengeController = (challengeService: IChallengeService) => {
  const challengeController = new ChallengeController(challengeService.getChallenges).do;

  app.get(CHALLENGE_ENDPOINTS.GET_CHALLENGES, challengeController);

  /* app.get(CHALLENGE_ENDPOINTS.GET_CHALLENGES, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await challengeService.getChallenges();

      res.status(200).json(result);
    } catch (error) {
      next(new UnexpectedError());
    }
  }); */

  app.post(
    CHALLENGE_ENDPOINTS.CREATE_CHALLENGE,
    inputValidation(createChallengeSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const challenge = await challengeService.createChallenge(req.body);
        res.status(201).json(challenge);
      } catch (error) {
        next(new UnexpectedError());
      }
    },
  );
};
