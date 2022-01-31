import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        entities: ['dist/**/*.entity.js'],
        synchronize: false,
        migrationsRun: true,
        migrations: ['dist/migrations/*{.ts,.js}'],
        cli: {
          migrationsDir: 'dist/migration' || './dist/migration',
        },
      }),
  },
];
