import * as z from 'zod';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '@errors/custom.error';

export const inputValidation = (schema: z.ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errorDetails = result.error.errors.map((err) => `${err.path.join('.')}: ${err.message}`).join(', ');
      next(new CustomError(`Input not valid: ${errorDetails}`, 400));
      return;
    }

    req.body = result.data;
    next();
  };
};
