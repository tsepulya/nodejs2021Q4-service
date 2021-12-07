import { v4 as uuidv4 } from "uuid";
// const usersService = require('./service.ts');
// const tasksService = require('../tasks/service');
import { FastifyReply, FastifyRequest } from 'fastify';
import { getAllUsers, addInUsers, deleteInUsers, changeInUsers } from './service';
import { UserNew } from "../../common/types";

export const getUsers = (req: FastifyRequest, reply: FastifyReply) => {
  const users = getAllUsers();
  const usersShown = users.map(obj => ({...obj}));
  usersShown.forEach(elem => {
    const elem1 = elem;
    delete elem1.password;
  });
  
  reply.send(usersShown);
}

export const getUser = (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = <FastifyRequest> req.params;
  const users = getAllUsers();
  const user = users.find((elem) => elem.id === id)

  reply.send(user);
}

export const addUser = (req: FastifyRequest, reply: FastifyReply) => {
  const { name, login, password} = <UserNew> req.body;
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

export const deleteUser = (req: FastifyRequest, reply: FastifyReply) => {
  const params = <FastifyRequest> req.params;
  const { id } = params;
//   const tasks = tasksService.getAllTasks();
//   const tasksWithId = tasks.filter(elem => elem.userId === id);
//   if (tasksWithId.length) {
//     tasksWithId.forEach(task => {
//       const taskNew = task;
//       taskNew.userId = null;
    //   tasksService.changeInTasks(task.id, taskNew);
//     })
//   }
  deleteInUsers(id);

  reply.send({ message: `User ${id} has been removed` })
}

export const updateUser = (req: FastifyRequest, reply: FastifyReply) => {
  const params = <FastifyRequest> req.params;
  const { id } = params;
  const { name, login, password} = <UserNew> req.body;

  changeInUsers(id, { name, login, password })

  const userShown = { id, name, login };

  reply.send(userShown);
}