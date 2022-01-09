import { FastifyReply, FastifyRequest } from "fastify";
import { v4 as uuidv4 } from "uuid";
import { deleteInTasks, getAllTasks } from "../tasks/service";
import { getAllBoards, addInBoards, deleteInBoards, changeInBoards } from "./service";
import { CustomRequest } from "./types";

/**
 * handler for get method for boards router
 * @param req - server request
 * @param reply - server response
 * @returns - array of boards
 */

export const getBoards = (req: FastifyRequest, reply: FastifyReply) => {
  const boards = getAllBoards();
  reply.send(boards);
}

/**
 * handler for get method for boards router
 * @param req - server request (with id params)
 * @param reply - server response
 * @returns - boards
 * @throws {@link NotFound} if board wasn't found
 */

export const getBoard = (req: CustomRequest, reply: FastifyReply) => {
  const { id } = req.params
  const boards = getAllBoards();
  const board = boards.find((elem) => elem.id === id)
  if (board) {
    reply.send(board)
  } else {
    reply.code(404);
    reply.send('Not found');
  }
}

/**
 * handler for post method for boards router
 * @param req - server request (with Board as body)
 * @param reply - server response
 * @returns - new board
 */

export const addBoard = (req: CustomRequest, reply: FastifyReply) => {
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

  addInBoards(board);

  reply.code(201).send(board)
}

/**
 * handler for delete method for boards router
 * @param req - server request (with id params)
 * @param reply - server response
 * @returns - message, that board was deleted
 */

export const deleteBoard = (req: CustomRequest, reply: FastifyReply) => {
  const { id } = req.params
  
  const tasks = getAllTasks();
  const tasksWithId = tasks.filter(elem => elem.boardId === id);
  if (tasksWithId.length) {
    tasksWithId.forEach(task => {
      if (task.id) {
        deleteInTasks(task.id);
      }
    })
  }

  deleteInBoards(id);


  reply.send({ message: `Board ${id} has been removed` })
}

/**
 * handler for put method for boards router
 * @param req - server request (with id params, Board as body)
 * @param reply - server response
 * @returns - changed board
 */

export const updateBoard = (req: CustomRequest, reply: FastifyReply) => {
  const { id } = req.params
  const { title, columns } = req.body
  changeInBoards(id, {title, columns} )

  reply.send({ id, title, columns });
}