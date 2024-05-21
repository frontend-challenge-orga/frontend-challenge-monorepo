import { app } from '@config/express.configuration';
import { inputValidation } from '@middlewares/input-validation.middleware';
import { UnexpectedError } from '#error';
import { CHALLENGE_ENDPOINTS, createChallengeSchema } from '@package/common';
import { httpStatus, type IChallengeService } from '@package/domain';
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

export class ChallengeControllerGet {
  request: IChallengeService['getChallenges'];

  constructor(request: IChallengeService['getChallenges']) {
    this.request = request;
  }

  public do = async (req: any, res: Pick<Response, 'status' | 'json'>, next: any): Promise<void> => {
    const result = await this.request();

    if (result instanceof Error) {
      next(new UnexpectedError({ detail: result.message }));
      return;
    }

    res.status(httpStatus.OK);
    res.json(result);
  };
}
