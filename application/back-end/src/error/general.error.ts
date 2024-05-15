import { BuildInErrorInput, CustomError } from './custom.error';
import { HttpStatus } from '@package/common/src/constants/errors';

export class UnexpectedError extends CustomError {
  constructor(input?: BuildInErrorInput) {
    super({
      message: 'An unexpected error occurred.',
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      detail: input.detail,
    });
    this.name = UnexpectedError.name;
  }
}

export class UnauthorizedError extends CustomError {
  constructor(input?: BuildInErrorInput) {
    super({
      message: 'Unauthorized action.',
      code: HttpStatus.UNAUTHORIZED,
      detail: input.detail,
    });
    this.name = UnauthorizedError.name;
  }
}

export class BadRequestError extends CustomError {
  constructor(input?: BuildInErrorInput) {
    super({
      message: 'Provided input is not valid.',
      code: HttpStatus.BAD_REQUEST,
      detail: input.detail,
    });
    this.name = BadRequestError.name;
  }
}
