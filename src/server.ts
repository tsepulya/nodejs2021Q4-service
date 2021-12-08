import fastify, {FastifyInstance} from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { userRoutes } from './resources/users/routes';
import { boardRoutes } from './resources/boards/routes';
import { taskRoutes } from "./resources/tasks/routes";
import { PORT } from "./common/config";

const server: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({logger:true});

server.register(userRoutes);
server.register(boardRoutes);
server.register(taskRoutes);

const start = async () => {
  try {
    await server.listen(PORT)
  } catch (error) {
    server.log.error(error)
    process.exit(1)
  }
}

start();
