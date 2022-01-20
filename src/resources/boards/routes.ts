import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { checkToken } from '../login/checkToken';
import {
    getBoards,
    getBoard,
    addBoard,
    deleteBoard,
    updateBoard,
  } from './handlers';
  
  const Column = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      title: { type: 'string' },
      order: { type: 'number' },
    },
  }

  const Board = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      title: { type: 'string' },
      columns: { type: 'array', columns: Column },
    },
  }
  
  const getBoardsOpts = {
    schema: {
      response: {
        200: {
          type: 'array',
          boards: Board,
        },
      },
    },
    preHandler: checkToken,
    handler: getBoards,
  }
  
  const getBoardOpts = {
    schema: {
      response: {
        200: Board,
      },
    },
    preHandler: checkToken,
    handler: getBoard,
  }
  
  const postBoardOpts = {
    schema: {
      body: {
        type: 'object',
        required: ['title', 'columns'],
        properties: {
          title: { type: 'string' },
          columns: { type: 'array', required: ['title', 'order'] },
        },
      },
      response: {
        201: Board,
      },
    },
    preHandler: checkToken,
    handler: addBoard,
  }
  
  const deleteBoardOpts = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
    preHandler: checkToken,
    handler: deleteBoard,
  }
  
  const updateBoardOpts = {
    schema: {
      response: {
        200: Board,
      },
    },
    preHandler: checkToken,
    handler: updateBoard,
  }

    /**
 * Create board router
 * @param fastify - fastify instance
 * @param options - fastify server options
 * @param done - callback
 * @returns Create board router
 */
  
  export function boardRoutes(fastify: FastifyInstance, options: FastifyServerOptions, done: CallableFunction) {
    fastify.get('/boards', getBoardsOpts)
  
    fastify.get('/boards/:id', getBoardOpts)
  
    fastify.post('/boards', postBoardOpts)
  
    fastify.delete('/boards/:id', deleteBoardOpts)
  
    fastify.put('/boards/:id', updateBoardOpts)
  
    done()
  }
  