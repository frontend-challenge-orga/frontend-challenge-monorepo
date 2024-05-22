import { CustomError, BuildInErrorInput, httpStatus } from './custom.error';

export class UnexpectedError extends CustomError {
  constructor(input?: BuildInErrorInput) {
    super({
      message: 'An unexpected error occurred.',
      code: httpStatus.INTERNAL_SERVER_ERROR,
      detail: input?.detail,
    });
    this.name = UnexpectedError.name;
  }
}

export class NotFoundError extends CustomError {
  constructor(input?: BuildInErrorInput) {
    super({
      message: 'Resource not found.',
      code: httpStatus.NOT_FOUND,
      detail: input?.detail,
    });
    this.name = NotFoundError.name;
  }
}

export class UnauthorizedError extends CustomError {
  constructor(input?: BuildInErrorInput) {
    super({
      message: 'Unauthorized action.',
      code: httpStatus.UNAUTHORIZED,
      detail: input?.detail,
    });
    this.name = UnauthorizedError.name;
  }
}

export class BadRequestError extends CustomError {
  constructor(input?: BuildInErrorInput) {
    super({
      message: 'Provided input is not valid.',
      code: httpStatus.BAD_REQUEST,
      detail: input?.detail,
    });
    this.name = BadRequestError.name;
  }
}

export class SubscriptionNotActiveError extends CustomError {
  constructor(input?: BuildInErrorInput) {
    super({
      message: 'Subscription is not active.',
      code: httpStatus.BAD_REQUEST,
      detail: input?.detail,
    });
    this.name = SubscriptionNotActiveError.name;
  }
}
