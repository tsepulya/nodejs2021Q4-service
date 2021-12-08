import { v4 as uuidv4 } from "uuid";
import { FastifyReply, FastifyRequest } from 'fastify';
import { getAllUsers, addInUsers, deleteInUsers, changeInUsers } from './service';
import { CustomRequest, User } from "./types";
import { changeInTasks, getAllTasks } from "../tasks/service";

/**
 * handler for get method for user router
 * @param req - server request
 * @param reply - server response
 * @returns - array of users
 */

export const getUsers = (req: FastifyRequest, reply: FastifyReply) => {
  const users = getAllUsers();
  const usersShown = users.map(obj => ({...obj}));
  usersShown.forEach(elem => {
    const elem1 = elem;
    delete elem1.password;
  });
  
  reply.send(usersShown);
}

/**
 * handler for get method for user router
 * @param req - server request (with id params)
 * @param reply - server response
 * @returns - user
 */

export const getUser = (req: CustomRequest, reply: FastifyReply) => {
  const { id } = req.params;
  const users = getAllUsers();
  const user = users.find((elem) => elem.id === id)

  reply.send(user);
}

/**
 * handler for post method for user router
 * @param req - server request (with User as body)
 * @param reply - server response
 * @returns - new user
 */

export const addUser = (req: FastifyRequest, reply: FastifyReply) => {
  const { name, login, password} = <User> req.body;
  const user = {
    id: uuidv4(),
    name,
    login,
    password
  }
  addInUsers(user);

  const userShown = {id: user.id, name: user.name, login: user.login};

  reply.code(201).send(userShown)
}

/**
 * handler for delete method for user router
 * @param req - server request (with id params)
 * @param reply - server response
 * @returns - message, that person was deleted
 */

export const deleteUser = (req: CustomRequest, reply: FastifyReply) => {
  const { id } = req.params;
  const tasks = getAllTasks();
  const tasksWithId = tasks.filter(elem => elem.userId === id);
  if (tasksWithId.length) {
    tasksWithId.forEach(task => {
      const taskNew = task;
      taskNew.userId = null;
      if (task.id) {
        changeInTasks(task.id, taskNew);
      }
    })
  }
  deleteInUsers(id);

  reply.send({ message: `User ${id} has been removed` })
}

/**
 * handler for put method for user router
 * @param req - server request (with id params, User as body)
 * @param reply - server response
 * @returns - changed user
 */

export const updateUser = (req: CustomRequest, reply: FastifyReply) => {
  const { id } = req.params;
  const { name, login, password} = req.body;

  changeInUsers(id, { name, login, password })

  const userShown = { id, name, login };

  reply.send(userShown);
}