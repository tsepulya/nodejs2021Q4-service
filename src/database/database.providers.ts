import { createConnection } from 'typeorm';
import connectionOptions from 'src/ormconfig';
import { DATABASE_CONNECTION } from 'src/common/constants';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () =>
      await createConnection(
        connectionOptions
      ),
  },
];
