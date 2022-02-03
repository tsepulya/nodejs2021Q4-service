import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HOST, PORT, POSTGRES_HOST } from './common/config';
import { ADDRESS, DOCKER } from './common/constants';
import { HttpExceptionFilter } from './exceptionFilters/exception.filters';

const HOST_APP = process.env.NODE_ENV === DOCKER ? POSTGRES_HOST : HOST;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new HttpExceptionFilter());
  if (HOST_APP === POSTGRES_HOST) {
    await app.listen(PORT, ADDRESS);
  } else {
    await app.listen(PORT);
  }
}

bootstrap();
