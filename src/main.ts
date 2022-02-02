import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptionFilters/exception.filters';

const PORT = 4000;
const HOST = process.env.NODE_ENV === 'docker' ? 'my_database' : 'localhost';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new HttpExceptionFilter());
  if (HOST === 'my_database') {
    await app.listen(PORT, '0.0.0.0');
  } else {
    await app.listen(PORT);
  }
}

bootstrap();
