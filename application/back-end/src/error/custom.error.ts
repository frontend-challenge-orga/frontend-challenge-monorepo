import { HttpStatus } from '@package/common';

export class CustomError extends Error {
  public code: number;
  public detail: string;

  constructor({ message, code, detail }: CustomErrorInput) {
    super(message);
    this.code = code ?? HttpStatus.INTERNAL_SERVER_ERROR;
    this.detail = detail ?? '';
    this.name = CustomError.name;
  }
}
type CustomErrorInput = {
  message: string;
  code?: HttpStatus;
  detail?: string;
};

export type BuildInErrorInput = Pick<CustomErrorInput, 'detail'>;
