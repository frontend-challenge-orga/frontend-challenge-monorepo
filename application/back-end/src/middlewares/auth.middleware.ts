import { extractAuthToken, ISessionRepository } from '@package/domain';
import type { Request, Response, NextFunction } from 'express';
import { UnauthorizedError, UnexpectedError } from '#error';

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
      next(new UnauthorizedError({ detail: 'no token provided' }));
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
      next(new UnauthorizedError({ detail: 'no token provided' }));
    }

    // TODO: Validate the token and extract the role information
    // This will depend on how you're handling authentication and what library you're using for JWTs

    next();
  }
}
