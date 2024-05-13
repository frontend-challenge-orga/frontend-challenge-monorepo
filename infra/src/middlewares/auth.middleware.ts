import { SessionApi } from '@monorepo/domain';
import { PROTECTED_ENDPOINTS_ERROR } from '@monorepo/packages';
import type { Request, Response, NextFunction } from 'express';

export class AuthMiddleware {
  private sessionApi: SessionApi;

  constructor(sessionApi: SessionApi) {
    this.sessionApi = sessionApi;
  }

  async authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers['authorization'];

    if (!token) {
      res.status(401).json({ message: PROTECTED_ENDPOINTS_ERROR.TOKEN_NOT_PROVIDED });
      return;
    }

    // TODO: Validate the token
    const sessions = await this.sessionApi.getSessionsByUserId(token);

    next();
  }

  async admin(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers['authorization'];

    if (!token) {
      res.status(401).json({ message: PROTECTED_ENDPOINTS_ERROR.TOKEN_NOT_PROVIDED });
      return;
    }

    // TODO: Validate the token and extract the role information
    // This will depend on how you're handling authentication and what library you're using for JWTs

    next();
  }
}
