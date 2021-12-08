// const fastify = require('fastify')({ logger: true })

import fastify, {FastifyInstance} from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
// import fastifySwagger from "fastify-swagger";
import { userRoutes } from './resources/users/routes';
import { boardRoutes } from './resources/boards/routes';

const PORT = 4000; /// /////////////////////////////////////////////////!!!!!!!!!!!

const server: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({logger:true});

// const { PORT } = require('./common/config.ts');

// server.register(fastifySwagger, {
//   exposeRoute: true,
//   routePrefix: '/docs',
//   swagger: {
//     info: { title: 'fastify-api' },
//   },
// })

server.register(userRoutes);
server.register(boardRoutes);
// fastify.register(require('./resources/tasks/routes'));

const start = async () => {
  try {
    await server.listen(PORT)
  } catch (error) {
    server.log.error(error)
    process.exit(1)
  }
}

start();
