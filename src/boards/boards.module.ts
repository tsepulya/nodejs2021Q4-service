import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { DatabaseModule } from 'src/database/database.module';
import { boardsProviders } from './boards.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BoardsController],
  providers: [
    ...boardsProviders,
    BoardsService
  ],
})
export class BoardsModule {}
