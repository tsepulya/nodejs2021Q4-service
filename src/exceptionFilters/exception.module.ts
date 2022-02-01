import { Module } from '@nestjs/common';
import { HttpExceptionFilter } from './exception.filters';

@Module({
  providers: [HttpExceptionFilter],
  exports: [HttpExceptionFilter],
})
export class ExceptionModule {}