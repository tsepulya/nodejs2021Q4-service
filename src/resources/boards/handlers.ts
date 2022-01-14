import { FastifyReply, FastifyRequest } from "fastify";
import { getRepository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { BoardDB } from "../../entity/BoardDB";
// import { ColumnDB } from "../../entity/ColumnDB";
import { TaskDB } from "../../entity/TaskDB";
import CustomError from "../../errors";
import { log } from "../../logging";
import { CustomRequest } from "./types";

const RELATIONS = { relations: ['columns'] };

/**
 * handler for get method for boards router
 * @param req - server request
 * @param reply - server response
 * @returns - array of boards
 */

export const getBoards = async (req: FastifyRequest, reply: FastifyReply) => {
  // const boards = getAllBoards();
  // reply.send(boards);
  // const boards = await getRepository(BoardDB).find();
  const boards = await getRepository(BoardDB).find(RELATIONS);
  reply.send(boards);
}

/**
 * handler for get method for boards router
 * @param req - server request (with id params)
 * @param reply - server response
 * @returns - boards
 * @throws {@link NotFound} if board wasn't found
 */

export const getBoard = async (req: CustomRequest, reply: FastifyReply) => {
  const { id } = req.params
  // const boards = getAllBoards();
  // const board = boards.find((elem) => elem.id === id)
  // if (board) {
  //   reply.send(board)
  // } else {
  //   reply.code(404);
  //   log.error(`Board with such ID ${id} doesn't exist`);
  //   throw new CustomError(`Board with such ID ${id} doesn't exist`, 404);
  // }
  const boardRepository = getRepository(BoardDB);
  const board = await boardRepository.findOne(id, RELATIONS);
  if (!board) {
    reply.code(404);
    log.error(`Board with such ID ${id} doesn't exist`);
    throw new CustomError(`Board with such ID ${id} doesn't exist`, 404);
  }
  reply.send(board);
}

// const addColumn = async (columns: Array<Column>) => {
//   const columnRepository = getRepository(ColumnDB);
//   columns.forEach(elem => {
//     const elem1 = elem;
//     elem1.id = uuidv4();
//     const columnNew = columnRepository.create(elem1);
//     columnRepository.save(columnNew);
//   })
// }

/**
 * handler for post method for boards router
 * @param req - server request (with Board as body)
 * @param reply - server response
 * @returns - new board
 */

export const addBoard = async (req: CustomRequest, reply: FastifyReply) => {
  const { title, columns } = req.body
  const board = {
    id: uuidv4(),
    title,
    columns
  }

  // board.columns.forEach(elem => {
  //   const elem1 = elem;
  //   elem1.id = uuidv4();
  // });

  // addInBoards(board);



  const boardRepository = getRepository(BoardDB);

  const boardNew = await boardRepository.create(board);
  await boardRepository.save(boardNew);
  // await addColumn(columns);


  reply.code(201).send(boardNew)

}

/**
 * handler for delete method for boards router
 * @param req - server request (with id params)
 * @param reply - server response
 * @returns - message, that board was deleted
 */

export const deleteBoard = async (req: CustomRequest, reply: FastifyReply) => {
  const { id } = req.params
  
  // const boards = getAllBoards();
  // const board = boards.find((elem) => elem.id === id)
  // if (!board) {
  //   reply.code(404);
  //   log.error(`Board with such ID ${id} doesn't exist`);
  //   throw new CustomError(`Board with such ID ${id} doesn't exist`, 404);
  // }

  // const tasks = getAllTasks();
  // const tasksWithId = tasks.filter(elem => elem.boardId === id);
  // if (tasksWithId.length) {
  //   tasksWithId.forEach(task => {
  //     if (task.id) {
  //       deleteInTasks(task.id);
  //     }
  //   })
  // }

  // deleteInBoards(id);

  const boardRepository = getRepository(BoardDB);
  const board = await boardRepository.findOne(id);
  if (!board) {
    reply.code(404);
    log.error(`Board with such ID ${id} doesn't exist`);
    throw new CustomError(`Board with such ID ${id} doesn't exist`, 404);
  }
  await boardRepository.delete(id);

  const taskRepository = getRepository(TaskDB);
  await taskRepository.delete({ boardId: id });

  reply.send({ message: `Board ${id} has been removed` })
}

// const updateColumn = async (columns: Array<Column>, id: string) => {
//   const columnRepository = getRepository(ColumnDB);
//   await columnRepository.delete({ board: id });
//   await addColumn(columns);
// }

/**
 * handler for put method for boards router
 * @param req - server request (with id params, Board as body)
 * @param reply - server response
 * @returns - changed board
 */

export const updateBoard = async (req: CustomRequest, reply: FastifyReply) => {
  const { id } = req.params

  // const boards = getAllBoards();
  // const board = boards.find((elem) => elem.id === id)
  // if (!board) {
  //   reply.code(404);
  //   log.error(`Board with such ID ${id} doesn't exist`);
  //   throw new CustomError(`Board with such ID ${id} doesn't exist`, 404);
  // }

  // const { columns } = req.body

  // changeInBoards(id, {title, columns} )

  // reply.send({ id, title, columns });

  const boardRepository = getRepository(BoardDB);
  const board = await boardRepository.findOne(id);
  if (!board) {
    reply.code(404);
    log.error(`Board with such ID ${id} doesn't exist`);
    throw new CustomError(`Board with such ID ${id} doesn't exist`, 404);
  }
  const updatedBoard = { ...board, ...req.body };
  // boardRepository.merge(board, req.body);
  await boardRepository.save(updatedBoard);
  const newBoard = await boardRepository.findOne(id, RELATIONS);
  reply.send(newBoard);
}
