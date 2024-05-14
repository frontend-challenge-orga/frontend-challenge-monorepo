import { extractAuthToken, SessionApi } from '@package/domain';
import { PROTECTED_ENDPOINTS_ERROR } from '@package/common';
import type { Request, Response, NextFunction } from 'express';
import { CustomError } from '@errors/custom.error';

export class AuthMiddleware {
  private sessionApi: SessionApi;

  constructor(sessionApi: SessionApi) {
    this.sessionApi = sessionApi;
    this.authenticate = this.authenticate.bind(this);
  }

  async authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
    const tokenAuthorization = req.headers['authorization'];

    const token = extractAuthToken(tokenAuthorization);

    if (!token) {
      res.status(401).json({ message: PROTECTED_ENDPOINTS_ERROR.TOKEN_NOT_PROVIDED });
      return;
    }

    try {
      const sessions = await this.sessionApi.getSessionsByToken(token);

      if (!sessions.length) {
        next(new CustomError(PROTECTED_ENDPOINTS_ERROR.TOKEN_INVALID, 401));
      }
    } catch (error) {
      next(new CustomError(PROTECTED_ENDPOINTS_ERROR.TOKEN_VALIDATION_ERROR, 500));
    }

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
