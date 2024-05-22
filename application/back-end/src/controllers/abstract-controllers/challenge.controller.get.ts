import { httpStatus, IChallengeService, UnexpectedError } from '@package/domain';
import type { Response } from 'express';

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
