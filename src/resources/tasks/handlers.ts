import { FastifyReply, FastifyRequest } from "fastify";
import { getRepository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { TaskDB } from "../../entity/TaskDB";
import CustomError from "../../errors";
import { log } from "../../logging";
import { CustomRequest } from "./types";

/**
 * handler for get method for tasks router
 * @param req - server request
 * @param reply - server response
 * @returns - array of tasks
 */

export const getTasks = async (req: FastifyRequest, reply: FastifyReply) => {
  const tasks = await getRepository(TaskDB).find();
  reply.send(tasks);
}

/**
 * handler for get method for tasks router
 * @param req - server request (with taskId params)
 * @param reply - server response
 * @returns - task
 * @throws {@link NotFound} if task wasn't found
 */

export const getTask = async (req: CustomRequest, reply: FastifyReply) => {
  const { taskId } = req.params
  const taskRepository = getRepository(TaskDB);
  const task = await taskRepository.findOne(taskId);
  if (task) {
    reply.send(task)
  } else {
    reply.code(404);
    log.error(`Task with such ID ${taskId} doesn't exist`);
    throw new CustomError(`Task with such ID ${taskId} doesn't exist`, 404);
  }

}

/**
 * handler for post method for tasks router
 * @param req - server request (with id params, Task as body)
 * @param reply - server response
 * @returns - new task
 */

export const addTask = async (req: CustomRequest, reply: FastifyReply) => {
  const { id } = req.params;
  const { title, order, description } = req.body;
  const { userId, columnId } = req.body;
  const task = {
    id: uuidv4(),
    title,
    order,
    description,
    userId,
    boardId: id,
    columnId
  }
  const taskRepository = getRepository(TaskDB);
  const taskNew = await taskRepository.create(task);
  await taskRepository.save(taskNew);
  reply.code(201).send(taskNew)

}

/**
 * handler for delete method for tasks router
 * @param req - server request (with taskId params)
 * @param reply - server response
 * @returns - message, that task was deleted
 */

export const deleteTask = async (req: CustomRequest, reply: FastifyReply) => {
  const { taskId } = req.params
  const taskRepository = getRepository(TaskDB);
  await taskRepository.delete(taskId);

  reply.send({ message: `Task ${taskId} has been removed` })
}

/**
 * handler for put method for tasks router
 * @param req - server request (with taskId params, User as body)
 * @param reply - server response
 * @returns - changed task
 */

export const updateTask = async (req: CustomRequest, reply: FastifyReply) => {
  const { taskId } = req.params

  const taskRepository = getRepository(TaskDB);
  const task = await taskRepository.findOne(taskId);
  if (!task) {
    reply.code(404);
    log.error(`Task with such ID ${taskId} doesn't exist`);
    throw new CustomError(`Task with such ID ${taskId} doesn't exist`, 404);
  }
  taskRepository.merge(task, req.body);
  await taskRepository.save(task);
  return reply.send(task);
}
