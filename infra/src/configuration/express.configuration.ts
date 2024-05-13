import express from 'express';
import * as http from 'http';
import { CustomError } from '@errors/custom.error';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import type { Request, Response, NextFunction } from 'express';

export const app = express();

const authMiddleware = new AuthMiddleware();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handling middleware
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    message: err.message || 'An unexpected error occurred',
  });
});

// Protected route
app.use('/authenticated-route*', authMiddleware.authenticate);

export const startExpressServer = (port: number): Promise<http.Server> => {
  return new Promise((resolve, reject) => {
    const server = app
      .listen(port, () => {
        resolve(server);
      })
      .on('error', (err: Error) => {
        reject(err);
      });
  });
};
