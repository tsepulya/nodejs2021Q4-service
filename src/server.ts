import fastify, {FastifyInstance} from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { userRoutes } from './resources/users/routes';
import { boardRoutes } from './resources/boards/routes';
import { taskRoutes } from "./resources/tasks/routes";
import { PORT } from "./common/config";
import log from "./logging";

/**
 * create fastify instance with some config
 */

const server: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({logger: log
});


/**
 * activate plugins - a set of routes: user, boards, task
 */

server.register(userRoutes);
server.register(boardRoutes);
server.register(taskRoutes);

/**
 * adjust fastify server
 */

const start = async () => {
  try {

    /**
      * Run the server
      * @param PORT - the name of a port
    */

    await server.listen(PORT)
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
