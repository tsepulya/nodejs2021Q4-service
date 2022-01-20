import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { checkToken } from '../login/checkToken';
import {
    getTasks,
    getTask,
    addTask,
    deleteTask,
    updateTask,
  } from './handlers';
  
  const Task = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      title: { type: 'string' },
      order: { type: 'number' },
      description: { type: 'string' },
      userId: { type: ['string', 'null'], nullable: true },
      boardId: { type: ['string', 'null'], nullable: true },
      columnId: { type: ['string', 'null'], nullable: true },
    },
  }

  const getTasksOpts = {
    schema: {
      response: {
        200: {
          type: 'array',
          boards: Task,
        },
      },
    },
    preHandler: checkToken,
    handler: getTasks,
  }
  
  const getTaskOpts = {
    schema: {
      response: {
        200: Task,
      },
    },
    preHandler: checkToken,
    handler: getTask,
  }
  
  const postTaskOpts = {
    schema: {
      body: {
        type: 'object',
        required: ['title', 'order', 'description', 'userId', 'boardId'],
        properties: {
          title: { type: 'string' },
          order: { type: 'number' },
          description: { type: 'string' },
          userId: { type: ['string', 'null'], nullable: true },
          boardId: { type: ['string', 'null'], nullable: true },
          columnId: { type: ['string', 'null'], nullable: true },
        },
      },
      response: {
        201: Task,
      },
    },
    preHandler: checkToken,
    handler: addTask,
  }
  
  const deleteTaskOpts = {
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
    handler: deleteTask,
  }
  
  const updateTaskOpts = {
    schema: {
      response: {
        200: Task,
      },
    },
    preHandler: checkToken,
    handler: updateTask,
  }

  /**
 * Create task router
 * @param fastify - fastify instance
 * @param options - fastify server options
 * @param done - callback
 * @returns Create task router
 */
  
  
export function taskRoutes(fastify: FastifyInstance, options: FastifyServerOptions, done: CallableFunction) {
    fastify.get('/boards/:id/tasks', getTasksOpts)
  
    fastify.get('/boards/:id/tasks/:taskId', getTaskOpts)
  
    fastify.post('/boards/:id/tasks', postTaskOpts)
  
    fastify.delete('/boards/:id/tasks/:taskId', deleteTaskOpts)
  
    fastify.put('/boards/:id/tasks/:taskId', updateTaskOpts)
  
    done()
  }
  