export class CustomError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
  ) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
