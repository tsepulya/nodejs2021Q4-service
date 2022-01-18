import fastify, {FastifyInstance} from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { createConnection } from "typeorm";
import { userRoutes } from './resources/users/routes';
import { boardRoutes } from './resources/boards/routes';
import { taskRoutes } from "./resources/tasks/routes";
import { PORT } from "./common/config";
import { log } from "./logging";
import connectionOptions from "./ormconfig";

/**
 * create fastify instance with some config
 */

export const server: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({logger: log
});

createConnection(connectionOptions);

const handleUncaughtException = () => {
  process.on('uncaughtException', ()=> {
    log.error(`We got uncaughtException`);
  });
};

const handleUnhandledRejection = () => {
  process.on('unhandledRejection', () => {
    log.error(`We got unhandledRejection`);
  });
}

handleUncaughtException();
handleUnhandledRejection();

/**
 * activate plugins - a set of routes: user, boards, task
 */

server.setNotFoundHandler((request, reply) => {
  reply.status(404).send(`Route ${request.url} not found.`);
  log.error(`Route ${request.url} not found`);
})

server.register(userRoutes);
server.register(boardRoutes);
server.register(taskRoutes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line no-unused-vars
server.setErrorHandler(function (error, request, reply) {
  this.log.error(error)
  const status = <number>error.statusCode;
  if (error.validation) {
    reply.status(400).send(error.message);
    log.error(error);
 }  log.error(error);
    reply.status(status).send(error.message);
})

/**
 * adjust fastify server
 */

const start = async () => {
  try {

    /**
      * Run the server
      * @param PORT - the name of a port
    */

    await server.listen(PORT, '0.0.0.0')
  } catch (error) {

    /**
      * Show the error, when run the server
      * @param error - the name of a error
    */
   
    server.log.error(error)
    process.exit(1)
  }
}

start();

