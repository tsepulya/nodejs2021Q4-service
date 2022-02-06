import { DocumentBuilder } from "@nestjs/swagger";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;
const POSTGRES_PORT = process.env.POSTGRES_PORT;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_DB = process.env.POSTGRES_DB;
const POSTGRES_ENTITIES = process.env.POSTGRES_ENTITIES;
const POSTGRES_MIGRATIONS = process.env.POSTGRES_MIGRATIONS;
const POSTGRES_MIGRATIONS_DIR = process.env.POSTGRES_MIGRATIONS_DIR;
const SECRET_KEY = <string>process.env.SECRET_KEY;
const HOST = process.env.HOST;
const POSTGRES_HOST = process.env.POSTGRES_HOST;
const USE_FASTIFY = process.env.USE_FASTIFY;

const configSwagger = new DocumentBuilder()
  .setTitle('REST service на NEST JS')
  .setDescription('Документация к REST API')
  .setVersion('1.0.0')
  .build()

export { PORT, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_ENTITIES, POSTGRES_MIGRATIONS, POSTGRES_MIGRATIONS_DIR, SECRET_KEY, HOST, POSTGRES_HOST, USE_FASTIFY, configSwagger };