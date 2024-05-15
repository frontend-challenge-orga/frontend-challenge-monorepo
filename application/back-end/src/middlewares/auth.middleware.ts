import { extractAuthToken, ISessionRepository } from '@package/domain';
import { HttpStatus, PROTECTED_ENDPOINTS_ERROR } from '@package/common';
import type { Request, Response, NextFunction } from 'express';
import { UnauthorizedError, UnexpectedError } from '@errors/general.error';

export class AuthMiddleware {
  private sessionRepository: ISessionRepository;

  constructor(sessionRepository: ISessionRepository) {
    this.sessionRepository = sessionRepository;
    this.authenticate = this.authenticate.bind(this);
  }

  async authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
    const tokenAuthorization = req.headers['authorization'];

    const token = extractAuthToken(tokenAuthorization);

    if (!token) {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: PROTECTED_ENDPOINTS_ERROR.TOKEN_NOT_PROVIDED });

      return;
    }

    try {
      const sessions = await this.sessionRepository.getSessionsByToken(token);

      if (!sessions.length) {
        next(new UnauthorizedError({ detail: 'no session found' }));
      }
    } catch (error) {
      next(new UnexpectedError({ detail: 'invalid token' }));
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
