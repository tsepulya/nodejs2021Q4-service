import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { tasksProviders } from 'src/tasks/tasks.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UsersHashHelper } from './users.hashHelper';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    ...usersProviders,
    ...tasksProviders,
    UsersService,
    UsersHashHelper
  ],
})

export class UsersModule {}
