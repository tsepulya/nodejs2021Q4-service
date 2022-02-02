import { ConnectionOptions } from 'typeorm';
// import dotenv from 'dotenv';
// import path from 'path';

// dotenv.config({ path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`)});

const HOST = process.env.NODE_ENV === 'docker' ? 'my_database' : 'localhost';

const connectionOptions = {
  type: 'postgres',
  host: HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [process.env.POSTGRES_ENTITIES] || ['./src/**.entity/*.ts'],
  synchronize: false,
  migrationsRun: true,
  migrations: [process.env.POSTGRES_MIGRATIONS] || ['./src/migration/*.ts'],
  cli: {
    migrationsDir: process.env.POSTGRES_MIGRATIONS_DIR || './src/migration',
  },
} as ConnectionOptions;

export default connectionOptions;
