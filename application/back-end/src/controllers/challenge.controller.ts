import { app } from '@config/express.configuration';
import { inputValidation } from '@middlewares/input-validation.middleware';
import { ChallengeControllerGet } from '@controllers/abstract-controllers/challenge.controller.get';
import { CHALLENGE_ENDPOINTS, createChallengeSchema } from '@package/common';
/*import { type IChallengeService, UnexpectedError } from '@package/domain';*/
import { UnexpectedError } from '#errors';
import type { IChallengeService } from '@package/domain';

import type { Request, Response, NextFunction } from 'express';

export const setupChallengeController = (challengeService: IChallengeService) => {
  app.get(CHALLENGE_ENDPOINTS.GET_CHALLENGES, new ChallengeControllerGet(challengeService.getChallenges).do);

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
