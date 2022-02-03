import { ConnectionOptions } from 'typeorm';
import { POSTGRES_HOST, HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_ENTITIES, POSTGRES_MIGRATIONS, POSTGRES_MIGRATIONS_DIR } from './common/config';
import { DOCKER } from './common/constants';

const HOST_APP = process.env.NODE_ENV === DOCKER ? POSTGRES_HOST : HOST;

const connectionOptions = {
  type: 'postgres',
  host: HOST_APP,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [POSTGRES_ENTITIES],
  synchronize: false,
  migrationsRun: true,
  migrations: [POSTGRES_MIGRATIONS],
  cli: {
    migrationsDir: POSTGRES_MIGRATIONS_DIR,
  },
} as ConnectionOptions;

export default connectionOptions;