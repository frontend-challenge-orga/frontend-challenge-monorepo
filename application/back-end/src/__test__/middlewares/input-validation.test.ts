import { inputValidation } from '@middlewares/input-validation.middleware';
import { getMockReq, getMockRes } from '@jest-mock/express';
/*import { CustomError } from '@package/domain';*/
import { CustomError } from '#errors';
import * as z from 'zod';

const { res, next, mockClear } = getMockRes();

beforeEach(() => {
  mockClear();
});

describe('inputValidation', () => {
  it('should call next with a CustomError if validation fails', () => {
    const schema = z.object({
      name: z.string(),
    });

    const middleware = inputValidation(schema);

    const req = getMockReq({
      body: {
        name: 123,
      },
    });

    middleware(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(CustomError));
  });

  it('should call next without error if validation succeeds', () => {
    const schema = z.object({
      name: z.string(),
    });

    const middleware = inputValidation(schema);

    const req = getMockReq({
      body: {
        name: 'John Doe',
      },
    });

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
