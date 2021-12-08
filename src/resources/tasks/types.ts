import { FastifyRequest } from "fastify";

export type Task = {
    title: string;
    order: number;
    description: string;
    userId: string;
    boardId: string;
    columnId: string;
    id: string;
};

export type CustomRequest = FastifyRequest<{
    Body: Task;
    Params: {id: string};
}>