import { Module } from '@nestjs/common';
import { UsersHashHelper } from 'src/users/users.hashHelper';
import { UsersService } from 'src/users/users.service';
import { usersProviders } from 'src/users/users.providers';
import { tasksProviders } from 'src/tasks/tasks.providers';
import { DatabaseModule } from 'src/database/database.module';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { LoginSignToken } from './login.signToken';

@Module({
  imports: [DatabaseModule],
  controllers: [LoginController],
  providers: [LoginService, LoginSignToken, UsersHashHelper, UsersService, ...usersProviders, ...tasksProviders]
})
export class LoginModule {}
