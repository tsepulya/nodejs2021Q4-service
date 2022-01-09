import { FastifyRequest } from "fastify";

export type Task = {
    title: string;
    order: number;
    description: string;
    userId: string | null;
    boardId: string | null;
    columnId: string | null;
    id?: string;
};

export type CustomRequest = FastifyRequest<{
    Body: Task;
    Params: {taskId: string, id: string};
}>