import { inputValidation } from '@middlewares/input-validation.middleware';
import { CustomError } from 'src/error/custom.error';
import { Request, Response } from 'express';
import * as z from 'zod';

describe('inputValidation', () => {
  it('should call next with a CustomError if validation fails', () => {
    const schema = z.object({
      name: z.string(),
    });

    const middleware = inputValidation(schema);

    const req = {
      body: {
        name: 123, // This will fail validation because name should be a string
      },
    } as Request;

    const res = {} as Response;
    const next = jest.fn();

    middleware(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(CustomError));
  });

  it('should call next without error if validation succeeds', () => {
    const schema = z.object({
      name: z.string(),
    });
    const middleware = inputValidation(schema);

    const req = {
      body: {
        name: 'John Doe', // This will pass validation
      },
    } as Request;

    const res = {} as Response;
    const next = jest.fn();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
