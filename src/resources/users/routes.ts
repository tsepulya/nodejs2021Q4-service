import { FastifyInstance, FastifyServerOptions } from 'fastify';
import {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser,
  } from './handlers';
  
  const User = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      login: { type: 'string' },
      password: { type: 'string' },
    },
  }
  
  const getUsersOpts = {
    schema: {
      response: {
        200: {
          type: 'array',
          users: User,
        },
      },
    },
    handler: getUsers,
  }
  
  const getUserOpts = {
    schema: {
      response: {
        200: User,
      },
    },
    handler: getUser,
  }
  
  const postUserOpts = {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'login', 'password'],
        properties: {
          name: { type: 'string' },
          login: { type: 'string' },
          password: { type: 'string' },
        },
      },
      response: {
        201: User,
      },
    },
    handler: addUser,
  }
  
  const deleteUserOpts = {
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
    handler: deleteUser,
  }
  
  const updateUserOpts = {
    schema: {
      response: {
        200: User,
      },
    },
    handler: updateUser,
  }
  
/**
 * Create user router
 * @param fastify - fastify instance
 * @param options - fastify server options
 * @param done - callback
 * @returns Create user router
 */
  
export function userRoutes(fastify: FastifyInstance, options: FastifyServerOptions, done: CallableFunction) {

    fastify.get('/users', getUsersOpts)
  
    fastify.get('/users/:id', getUserOpts)
  
    fastify.post('/users', postUserOpts)
  
    fastify.delete('/users/:id', deleteUserOpts)
  
    fastify.put('/users/:id', updateUserOpts)
  
    done()
}
