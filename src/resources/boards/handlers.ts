import { FastifyReply, FastifyRequest } from "fastify";
import { v4 as uuidv4 } from "uuid";
import { getAllBoards, addInBoards, deleteInBoards, changeInBoards } from "./service";
import { CustomRequest } from "./types";

export const getBoards = (req: FastifyRequest, reply: FastifyReply) => {
  const boards = getAllBoards();
  reply.send(boards);
}

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

export const deleteBoard = (req: CustomRequest, reply: FastifyReply) => {
  const { id } = req.params
//   const tasks = getAllTasks();
//   const tasksWithId = tasks.filter(elem => elem.boardId === id);
//   if (tasksWithId.length) {
//     tasksWithId.forEach(task => {
//       tasksService.deleteInTasks(task.id);
//     })
//   }

  deleteInBoards(id);


  reply.send({ message: `Board ${id} has been removed` })
}

export const updateBoard = (req: CustomRequest, reply: FastifyReply) => {
  const { id } = req.params
  const { title, columns } = req.body
  changeInBoards(id, {title, columns} )

  reply.send({ id, title, columns });
}