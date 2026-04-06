import { HttpStatus } from '@nestjs/common';

export type AppErrorContext = Record<string, unknown>;

export abstract class AppError extends Error {
  abstract readonly errorCode: string;

  readonly statusCode: HttpStatus;
  readonly context: AppErrorContext;

  protected constructor(
    message: string,
    statusCode: HttpStatus,
    context: AppErrorContext,
  ) {
    super(message);
    this.name = new.target.name;
    this.statusCode = statusCode;
    this.context = context ?? {};
  }

  toResponse(): {
    statusCode: number;
    message: string;
    errorCode: string;
    context: AppErrorContext;
    error: string;
  } {
    return {
      statusCode: this.statusCode,
      message: this.message,
      errorCode: this.errorCode,
      context: { ...this.context },
      error: HttpStatus[this.statusCode] ?? 'Error',
    };
  }
}
