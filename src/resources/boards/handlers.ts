import { FastifyReply, FastifyRequest } from "fastify";
import { getRepository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { BoardDB } from "../../entity/BoardDB";
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
  const boardRepository = getRepository(BoardDB);
  const board = await boardRepository.findOne(id, RELATIONS);
  if (!board) {
    reply.code(404);
    log.error(`Board with such ID ${id} doesn't exist`);
    throw new CustomError(`Board with such ID ${id} doesn't exist`, 404);
  }
  reply.send(board);
}

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

  const boardRepository = getRepository(BoardDB);

  const boardNew = await boardRepository.create(board);
  await boardRepository.save(boardNew);

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

/**
 * handler for put method for boards router
 * @param req - server request (with id params, Board as body)
 * @param reply - server response
 * @returns - changed board
 */

export const updateBoard = async (req: CustomRequest, reply: FastifyReply) => {
  const { id } = req.params

  const boardRepository = getRepository(BoardDB);
  const board = await boardRepository.findOne(id);
  if (!board) {
    reply.code(404);
    log.error(`Board with such ID ${id} doesn't exist`);
    throw new CustomError(`Board with such ID ${id} doesn't exist`, 404);
  }
  const updatedBoard = { ...board, ...req.body };
  await boardRepository.save(updatedBoard);
  const newBoard = await boardRepository.findOne(id, RELATIONS);
  reply.send(newBoard);
}
