import * as z from 'zod';
import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '#error';

export const inputValidation = (schema: z.ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const detail = result.error.errors.map((err) => `${err.path.join('.')}: ${err.message}`).join(', ');
      next(new BadRequestError({ detail }));
    }

    req.body = result.data;
    next();
  };
};
