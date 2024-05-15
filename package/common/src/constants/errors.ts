export const PROTECTED_ENDPOINTS_ERROR = {
  TOKEN_NOT_PROVIDED: 'Unauthorized: No token provided',
  TOKEN_INVALID: 'Unauthorized: Invalid token',
  TOKEN_VALIDATION_ERROR: 'Unauthorized: An error occurred while validating the token',
  UNAUTHORIZED: 'Unauthorized: You do not have the necessary permissions to access this route',
};

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}
