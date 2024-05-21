import { UnexpectedError } from '#error';
import { IChallengeService } from '@package/domain';
import type { Response, Request, Express, NextFunction } from 'express';

type App = Pick<Express, 'get' | 'post'>;
type MyRequest = any;
type MyResponse = Pick<Response, 'status' | 'json'>;
type MyNext = any;

export class ChallengeController {
  readonly request: IChallengeService['getChallenges'];

  constructor(request: IChallengeService['getChallenges']) {
    this.request = request;
  }

  public do = async (req: MyRequest, res: MyResponse, next: MyNext): Promise<void> => {
    const result = await this.request();

    if (result instanceof Error) {
      next(UnexpectedError);
      return;
    }

    res.status(200).json(result);
  };
}
