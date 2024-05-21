export class CustomError extends Error {
  public code: number;
  public detail: string;

  constructor({ message, code, detail }: CustomErrorInput) {
    super(message);
    this.code = code ?? NaN;
    this.detail = detail ?? '';
    this.name = CustomError.name;
  }
}

type CustomErrorInput = {
  message: string;
  code?: number;
  detail?: string;
};

export type BuildInErrorInput = Pick<CustomErrorInput, 'detail'>;

export const httpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export type HttpStatus = typeof httpStatus;
