const { v4: uuidv4 } = require('uuid')
// let users = require('./db');
const usersService = require('./service');
const tasksService = require('../tasks/service');

const getUsers = (req, reply) => {
  // reply.header("Content-Type", "application/json");
  const users = usersService.getAllUsers();
  const usersShown = users.map(obj => ({...obj}));
  usersShown.forEach(elem => {
    const elem1 = elem;
    delete elem1.password;
  });
  
  reply.send(usersShown);
}

const getUser = (req, reply) => {
  const { id } = req.params
  const users = usersService.getAllUsers();
  const user = users.find((elem) => elem.id === id)

  reply.send(user)
}

const addUser = (req, reply) => {
  const { name, login, password} = req.body
  const user = {
    id: uuidv4(),
    name,
    login,
    password
  }
  // users = [...users, user]
  usersService.addInUsers(user);

  const userShown = {id: user.id, name: user.name, login: user.login};

  reply.code(201).send(userShown)
}

const deleteUser = (req, reply) => {
  const { id } = req.params
  const tasks = tasksService.getAllTasks();
  const tasksWithId = tasks.filter(elem => elem.userId === id);
  if (tasksWithId.length) {
    tasksWithId.forEach(task => {
      const taskNew = task;
      taskNew.userId = null;
      tasksService.changeInTasks(task.id, taskNew);
    })
  }
  // users = users.filter((user) => user.id !== id)
  usersService.deleteInUsers(id);

  reply.send({ message: `User ${id} has been removed` })
}

const updateUser = (req, reply) => {
  const { id } = req.params
  const { name, login, password } = req.body

  // users = users.map((user) => (user.id === id ? { id, name, login, password } : user))

  // const user = users.find((elem) => elem.id === id)

  usersService.changeInUsers(id, { name, login, password })

  const userShown = { id, name, login };

  reply.send(userShown);
}

module.exports = {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
}