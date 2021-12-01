const {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser,
  } = require('./handlers');
  
  // User schema
  const User = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      login: { type: 'string' },
      password: { type: 'string' },
    },
  }
  
  // Options for get all users
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
  
  function userRoutes(fastify, options, done) {
    // Get all users
    fastify.get('/users', getUsersOpts)
  
    // Get single users
    fastify.get('/users/:id', getUserOpts)
  
    // Add user
    fastify.post('/users', postUserOpts)
  
    // Delete user
    fastify.delete('/users/:id', deleteUserOpts)
  
    // Update user
    fastify.put('/users/:id', updateUserOpts)
  
    done()
  }
  
  module.exports = userRoutes