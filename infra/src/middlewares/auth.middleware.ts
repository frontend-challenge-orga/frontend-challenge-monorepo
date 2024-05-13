import type { Request, Response, NextFunction } from 'express';

export class AuthMiddleware {
  async authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers['authorization'];

    if (!token) {
      res.status(401).json({ message: 'Unauthorized: No token provided' });
      return;
    }

    // TODO: Validate the token and extract the user information
    // This will depend on how you're handling authentication and what library you're using for JWTs

    next();
  }

  async admin(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers['authorization'];

    if (!token) {
      res.status(401).json({ message: 'Unauthorized: No token provided' });
      return;
    }

    // TODO: Validate the token and extract the role information
    // This will depend on how you're handling authentication and what library you're using for JWTs

    next();
  }
}
