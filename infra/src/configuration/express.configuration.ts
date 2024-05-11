import express from "express";
import * as http from "http";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const startExpressServer = (port: number): Promise<http.Server> => {
  return new Promise((resolve, reject) => {
    const server = app
      .listen(port, () => {
        resolve(server);
      })
      .on("error", (err: Error) => {
        reject(err);
      });
  });
};