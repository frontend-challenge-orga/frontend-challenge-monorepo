import { extractAuthToken, ISessionService, IUserService, UnauthorizedError, UnexpectedError } from '@package/domain';
import type { Request, Response, NextFunction } from 'express';

interface IAuthMiddleware {
  extractToken(req: Request, next: NextFunction): string | null;
  authenticate(req: Request, res: Response, next: NextFunction): Promise<void>;
  admin(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class AuthMiddleware implements IAuthMiddleware {
  private sessionService: ISessionService;
  private userService: IUserService;

  constructor(sessionService: ISessionService, userService: IUserService) {
    this.sessionService = sessionService;
    this.userService = userService;

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
      const sessions = await this.sessionService.getSessionsByToken(token);

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
      const sessions = await this.sessionService.getSessionsByToken(token);
      const role = await this.userService.getUserRole(sessions[0].userId);

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
