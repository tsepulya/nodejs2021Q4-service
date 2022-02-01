import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { tasksProviders } from 'src/tasks/tasks.providers';
// import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { boardsProviders } from './boards.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BoardsController],
  providers: [...boardsProviders, ...tasksProviders, BoardsService],
})
export class BoardsModule {}
