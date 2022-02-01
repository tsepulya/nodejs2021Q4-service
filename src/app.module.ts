import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { LoginModule } from './login/login.module';
import { FileModule } from './file/file.module';
import { ExceptionModule } from './exceptionFilters/exception.module';

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
              winston.format.colorize(),
              winston.format.simple()
            )
          }),
          new winston.transports.File({
            dirname: ('./src/logs'), //path to where save loggin result 
            filename: 'error.log', //name of file where will be saved logging result
            level: 'error',
            // format: winston.format.errors()
          }),
          new winston.transports.File({
            dirname: ('./src/logs'),
            filename: 'all.log',
            level: 'info',
          }),
        ],
      })
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
