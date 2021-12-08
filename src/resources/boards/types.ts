import { FastifyRequest } from "fastify";

export type Column = {
    title: string;
    order: number;
    id?: string;
};

export type Board = {
    title: string;
    columns: Array<Column>;
    id?: string;
};

export type CustomRequest = FastifyRequest<{
    Body: Board;
    Params: {id: string};
}>