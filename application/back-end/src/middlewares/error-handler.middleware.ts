import { app } from '@config/express.configuration';
import { CustomError } from 'src/error/custom.error';
import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@package/common';

export function setupErrorHandler() {
  app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const code = err.code ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || 'An unexpected error occurred';
    const detail = err.detail || '';

    res.status(code).json({ message, detail });
  });
}
