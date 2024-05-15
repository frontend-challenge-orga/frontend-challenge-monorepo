import { app } from '@config/express.configuration';
import { CustomError } from '@errors/custom.error';
import { Request, Response, NextFunction } from 'express';

export function setupErrorHandler() {
  app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
      message: err.message || 'An unexpected error occurred',
    });
  });
}
