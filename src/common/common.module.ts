import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpAppExceptionFilter } from './filters/http-app-exception.filter';

@Module({
  providers: [{ provide: APP_FILTER, useClass: HttpAppExceptionFilter }],
})
export class CommonModule {}
