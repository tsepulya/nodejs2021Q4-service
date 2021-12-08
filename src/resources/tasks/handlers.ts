import { FastifyReply, FastifyRequest } from "fastify";
import { v4 as uuidv4 } from "uuid";
import { getAllBoards } from "../boards/service";
import { getAllUsers } from "../users/service";
import { addInTasks, changeInTasks, deleteInTasks, getAllTasks } from "./service";
import { CustomRequest } from "./types";

/**
 * handler for get method for tasks router
 * @param req - server request
 * @param reply - server response
 * @returns - array of tasks
 */

export const getTasks = (req: FastifyRequest, reply: FastifyReply) => {
  reply.send(getAllTasks());
}

/**
 * handler for get method for tasks router
 * @param req - server request (with taskId params)
 * @param reply - server response
 * @returns - task
 * @throws {@link NotFound} if task wasn't found
 */

export const getTask = (req: CustomRequest, reply: FastifyReply) => {
  const { taskId } = req.params
  const tasks = getAllTasks();
  const task = tasks.find((elem) => elem.id === taskId);
  if (task) {
    reply.send(task)
  } else {
    reply.code(404);
    reply.send("Not found");
  }
}

/**
 * handler for post method for tasks router
 * @param req - server request (with id params, Task as body)
 * @param reply - server response
 * @returns - new task
 */

export const addTask = (req: CustomRequest, reply: FastifyReply) => {
  const { id } = req.params;
  const { title, order, description } = req.body;
  let { userId, columnId } = req.body;
  const users = getAllUsers();
  const boards = getAllBoards();
  if (!users.filter(elem => elem.id === userId).length) {
    userId = null;
  }
  boards.forEach(board => {
    if (!board.columns.filter(elem => elem.id === columnId).length) {
      columnId = null;
    };
  })
  const task = {
    id: uuidv4(),
    title,
    order,
    description,
    userId,
    boardId: id,
    columnId
  }

  addInTasks(task);

  reply.code(201).send(task);
}

/**
 * handler for delete method for tasks router
 * @param req - server request (with taskId params)
 * @param reply - server response
 * @returns - message, that task was deleted
 */

export const deleteTask = (req: CustomRequest, reply: FastifyReply) => {
  const { taskId } = req.params

  deleteInTasks(taskId);

  reply.send({ message: `Board ${taskId} has been removed` })
}

/**
 * handler for put method for tasks router
 * @param req - server request (with taskId params, User as body)
 * @param reply - server response
 * @returns - changed task
 */

export const updateTask = (req: CustomRequest, reply: FastifyReply) => {
  const { taskId } = req.params
  const { title, order, description, userId, boardId, columnId } = req.body;

  changeInTasks(taskId, { title, order, description, userId, boardId, columnId } );

  reply.send({ taskId, title, order, description, userId, boardId, columnId })
}
