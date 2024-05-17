import { extractAuthToken, ISessionRepository, IUserRepository } from '@package/domain';
import { UnauthorizedError, UnexpectedError } from '#error';
import type { Request, Response, NextFunction } from 'express';

interface IAuthMiddleware {
  extractToken(req: Request, next: NextFunction): string | null;
  authenticate(req: Request, res: Response, next: NextFunction): Promise<void>;
  admin(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class AuthMiddleware implements IAuthMiddleware {
  private sessionRepository: ISessionRepository;
  private userRepository: IUserRepository;

  constructor(sessionRepository: ISessionRepository, userRepository: IUserRepository) {
    this.sessionRepository = sessionRepository;
    this.userRepository = userRepository;
    this.authenticate = this.authenticate.bind(this);
    this.admin = this.admin.bind(this);
  }

  extractToken(req: Request, next: NextFunction): string | null {
    const tokenAuthorization = req.headers['authorization'];
    const token = extractAuthToken(tokenAuthorization);

    if (!token) {
      next(new UnauthorizedError({ detail: 'no token provided' }));
      return null;
    }

    return token;
  }

  async authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = this.extractToken(req, next);

    try {
      const sessions = await this.sessionRepository.getSessionsByToken(token);

      if (!sessions.length) {
        next(new UnauthorizedError({ detail: 'no session found' }));
        return;
      }
    } catch (error) {
      next(new UnexpectedError({ detail: 'invalid token' }));
      return;
    }

    next();
  }

  async admin(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = this.extractToken(req, next);

    try {
      const sessions = await this.sessionRepository.getSessionsByToken(token);
      const role = await this.userRepository.getUserRole(sessions[0].userId);

      const isAuthorized = role === 'ADMIN';

      if (!isAuthorized) {
        next(new UnauthorizedError({ detail: 'user is not an admin' }));
        return;
      }
    } catch (error) {
      next(new UnexpectedError({ detail: 'invalid token' }));
      return;
    }

    next();
  }
}
