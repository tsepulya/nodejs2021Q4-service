import { ConnectionOptions } from "typeorm";

const connectionOptions = {
    type: 'postgres',
    host: process.env.HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    migrationsRun: true,
    entities: [process.env.POSTGRES_ENTITIES] || ["src/entity/*.ts"] || ["./entity/*.ts"],
    migrations: [process.env.POSTGRES_MIGRATIONS] || ["src/migration/*.ts"] || ["./migration/*.ts"],
    cli: {
      migrationsDir: process.env.POSTGRES_MIGRATIONS || "src/migration/*.ts" || "./migration/*.ts"
  }
  } as ConnectionOptions;

  export default connectionOptions;