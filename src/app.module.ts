import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { LoginModule } from './login/login.module';
// import { DatabaseModule } from './database/database.module';
// import { databaseProviders } from './database/database.providers';

@Module({
  imports: [UsersModule, BoardsModule, TasksModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
