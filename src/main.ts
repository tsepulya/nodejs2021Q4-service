import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule } from "@nestjs/swagger";
import { AppModule } from './app.module';
import { configSwagger, HOST, PORT, POSTGRES_HOST, USE_FASTIFY } from './common/config';
import { ADDRESS, DOCKER } from './common/constants';
import { HttpExceptionFilter } from './exceptionFilters/exception.filters';

const HOST_APP = process.env.NODE_ENV === DOCKER ? POSTGRES_HOST : HOST;

async function bootstrap() {

  if (USE_FASTIFY === 'true') {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter()
    );
    const document = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('doc', app, document)
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(PORT, ADDRESS);

  } else {
    const app = await NestFactory.create(AppModule);
    const document = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('doc', app, document)
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());
    if (HOST_APP === POSTGRES_HOST) {
      await app.listen(PORT, ADDRESS);
    } else {
      await app.listen(PORT);
    }
  }



}

bootstrap();
