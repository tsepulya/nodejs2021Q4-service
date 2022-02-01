import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
// import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { tasksProviders } from './tasks.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [...tasksProviders, TasksService],
})
export class TasksModule {}
