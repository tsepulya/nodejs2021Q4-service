const {
    getBoards,
    getBoard,
    addBoard,
    deleteBoard,
    updateBoard,
  } = require('./handlers');
  
  // Column schema
  const Column = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      title: { type: 'string' },
      order: { type: 'number' },
    },
  }

  // Board schema
  const Board = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      title: { type: 'string' },
      columns: { type: 'array', columns: Column },
    },
  }
  
  // Options for get all boards
  const getBoardsOpts = {
    schema: {
      response: {
        200: {
          type: 'array',
          boards: Board,
        },
      },
    },
    handler: getBoards,
  }
  
  const getBoardOpts = {
    schema: {
      response: {
        200: Board,
      },
    },
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
    handler: deleteBoard,
  }
  
  const updateBoardOpts = {
    schema: {
      response: {
        200: Board,
      },
    },
    handler: updateBoard,
  }
  
  function boardRoutes(fastify, options, done) {
    // Get all boards
    fastify.get('/boards', getBoardsOpts)
  
    // Get single boards
    fastify.get('/boards/:id', getBoardOpts)
  
    // Add board
    fastify.post('/boards', postBoardOpts)
  
    // Delete board
    fastify.delete('/boards/:id', deleteBoardOpts)
  
    // Update board
    fastify.put('/boards/:id', updateBoardOpts)
  
    done()
  }
  
  module.exports = boardRoutes