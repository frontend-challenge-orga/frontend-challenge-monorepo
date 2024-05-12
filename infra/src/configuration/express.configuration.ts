import express from 'express';
import * as http from 'http';
import type { Request, Response, NextFunction } from 'express';
import { CustomError } from '@errors/custom.error';

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    message: err.message || 'An unexpected error occurred',
  });
});

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
