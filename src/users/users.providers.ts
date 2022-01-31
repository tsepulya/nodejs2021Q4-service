import { Connection } from 'typeorm';
import { UserDB } from './entities/user.entity';

export const usersProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(UserDB),
    inject: ['DATABASE_CONNECTION'],
  },
];
