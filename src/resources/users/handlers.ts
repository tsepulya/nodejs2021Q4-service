import { v4 as uuidv4 } from "uuid";
import { FastifyReply, FastifyRequest } from 'fastify';
import {getRepository} from "typeorm";
import { CustomRequest, User } from "./types";
import CustomError from "../../errors";
import { log } from "../../logging";
import { UserDB } from "../../entity/UserDB";
import { TaskDB } from "../../entity/TaskDB";
import { Login } from "../login/types";

/**
 * handler for get method for user router
 * @param req - server request
 * @param reply - server response
 * @returns - array of users
 */

export const getUsers = async (req: FastifyRequest, reply: FastifyReply) => {
  const users = await getRepository(UserDB).find();
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

export const getUser = async (req: CustomRequest, reply: FastifyReply) => {
  const { id } = req.params;
  const userRepository = getRepository(UserDB);
  const user = await userRepository.findOne(id);
  if (!user) {
    reply.code(404);
    log.error(`User with such ID ${id} doesn't exist`);
    throw new CustomError(`User with such ID ${id} doesn't exist`, 404);
  }
  reply.send(user);
}

export const getUserByProps = async (props: Login) => {
  const { login, password } = props;
  const userRepository = getRepository(UserDB);
  const user = await userRepository.findOne({ where: { login, password } });
  if (!user) {
    return null;
  }
  return user;
  // const users = await getRepository(UserDB).find();
  // users.find(user => {
  //   const matches = Object.entries(props).map(item => {
  //     const [prop, value] = item;
  //     return user[prop] === value;
  //   });
  //   return matches.every(item => item === true);
  // })
}

/**
 * handler for post method for user router
 * @param req - server request (with User as body)
 * @param reply - server response
 * @returns - new user
 */

export const addUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const { name, login, password} = <User> req.body;
  const user = {
    id: uuidv4(),
    name,
    login,
    password
  }

  const userRepository = getRepository(UserDB);

  const userNew = await userRepository.create(user);
  await userRepository.save(userNew);
  const userShown = {id: user.id, name: user.name, login: user.login};
  reply.code(201).send(userShown)
}

/**
 * handler for delete method for user router
 * @param req - server request (with id params)
 * @param reply - server response
 * @returns - message, that person was deleted
 */

export const deleteUser = async (req: CustomRequest, reply: FastifyReply) => {
  const { id } = req.params;

  const userRepository = getRepository(UserDB);
  await userRepository.delete(id);

  const taskRepository = getRepository(TaskDB);
  await taskRepository.update({ userId: id }, { userId: null });

  reply.send({ message: `User ${id} has been removed` })
}

/**
 * handler for put method for user router
 * @param req - server request (with id params, User as body)
 * @param reply - server response
 * @returns - changed user
 */

export const updateUser = async (req: CustomRequest, reply: FastifyReply) => {
  const { id } = req.params;
  const { name, login } = req.body;

  const userShown = { id, name, login };

  const userRepository = getRepository(UserDB);
  const user = await userRepository.findOne(id);
  if (!user) {
    reply.code(404);
    log.error(`User with such ID ${id} doesn't exist`);
    throw new CustomError(`User with such ID ${id} doesn't exist`, 404);
  }
  userRepository.merge(user, req.body);
  await userRepository.save(user);
  return reply.send(userShown);
}