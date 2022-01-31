import { ConnectionOptions } from 'typeorm';
// import dotenv from 'dotenv';
// import path from 'path';

// dotenv.config({ path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`)});

// const HOST = process.env.NODE_ENV === 'docker' ? 'my_database' : 'localhost';

const connectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: ['./src/**.entity/*.ts'],
  synchronize: false,
  migrationsRun: true,
  migrations: ['./src/migration/*.ts'],
  cli: {
    migrationsDir: './src/migration',
  },
} as ConnectionOptions;

export default connectionOptions;
