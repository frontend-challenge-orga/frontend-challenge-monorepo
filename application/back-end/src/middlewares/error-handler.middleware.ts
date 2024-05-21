import { app } from '@config/express.configuration';
import { Request, Response, NextFunction } from 'express';
import { httpStatus, CustomError } from '@package/domain';

export function setupErrorHandler() {
  app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const code = err.code ?? httpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || 'An unexpected error occurred';
    const detail = err.detail || '';

    res.status(code).json({ message, detail });
  });
}
