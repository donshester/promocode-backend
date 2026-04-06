import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import type { Response } from 'express';
import { AppError } from '../errors/app.error';

@Catch(AppError)
export class HttpAppExceptionFilter implements ExceptionFilter {
  catch(exception: AppError, host: ArgumentsHost): void {
    const res = host.switchToHttp().getResponse<Response>();
    const body = exception.toResponse();
    res.status(body.statusCode).json(body);
  }
}
