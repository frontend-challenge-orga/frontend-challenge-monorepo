import express from 'express';
import cors from 'cors';
import * as http from 'http';
import { AuthMiddleware } from '@middlewares/auth.middleware';

export const app = express();

export const APPLICATION_PORT = 8080;

export const configMiddleware = async (authMiddleware: AuthMiddleware) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/authenticated-route*', authMiddleware.authenticate);
  app.use('/admin-route*', authMiddleware.admin);
};

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
