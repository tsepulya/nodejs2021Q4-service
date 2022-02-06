import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { LoginModule } from './login/login.module';
import { FileModule } from './file/file.module';
import { ExceptionModule } from './exceptionFilters/exception.module';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [UsersModule, BoardsModule, TasksModule, LoginModule, FileModule, ExceptionModule,
      WinstonModule.forRoot({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              // winston.format.prettyPrint(),
              winston.format.colorize(),
              winston.format.simple(),
              // winston.format.splat()
            )
          }),
          new winston.transports.File({
            dirname: ('./src/logs'), 
            filename: 'error.log',
            level: 'error',
          }),
          new winston.transports.File({
            dirname: ('./src/logs'),
            filename: 'all.log',
            level: 'info',
          }),
        ],
      })
    ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes('*');
  }
}