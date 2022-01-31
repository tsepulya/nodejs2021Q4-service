import { Connection } from 'typeorm';
import { BoardDB } from './entities/board.entity';

export const boardsProviders = [
  {
    provide: 'BOARD_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(BoardDB),
    inject: ['DATABASE_CONNECTION'],
  },
];
