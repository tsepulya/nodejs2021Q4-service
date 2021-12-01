const { v4: uuidv4 } = require('uuid');
// let boards = require('./db');
const boardsService = require('./service');
const tasksService = require('../tasks/service');

const getBoards = (req, reply) => {
  const boards = boardsService.getAllBoards();
  reply.send(boards);
}

const getBoard = (req, reply) => {
  const { id } = req.params
  const boards = boardsService.getAllBoards();
  const board = boards.find((elem) => elem.id === id)
  if (board) {
    reply.send(board)
  } else {
    reply.code(404);
    reply.send('Not found');
  }

}

const addBoard = (req, reply) => {
  const { title, columns } = req.body
  const board = {
    id: uuidv4(),
    title,
    columns
  }

  board.columns.forEach(elem => {
    const elem1 = elem;
    elem1.id = uuidv4();
  });

  // boards = [...boards, board]
  boardsService.addInBoards(board);

  reply.code(201).send(board)
}

const deleteBoard = (req, reply) => {
  const { id } = req.params
  // boards = boards.filter((board) => board.id !== id)
  const tasks = tasksService.getAllTasks();
  const task = tasks.find(elem => elem.boardId === id);
  if (task) {
    tasksService.deleteInTasks(task.id);
  }

  boardsService.deleteInBoards(id);


  reply.send({ message: `Board ${id} has been removed` })
}

const updateBoard = (req, reply) => {
  const { id } = req.params
  const { title, columns } = req.body

  // boards = boards.map((board) => (board.id === id ? { id, title, columns } : board))

  // const board = boards.find((elem) => elem.id === id)

  boardsService.changeInBoards(id, {title, columns} )

  reply.send({ id, title, columns });
}

module.exports = {
  getBoards,
  getBoard,
  addBoard,
  deleteBoard,
  updateBoard,
}