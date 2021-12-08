import { FastifyRequest } from "fastify";

export type User = {
    name: string;
    login: string;
    password?: string;
    id?: string;
};

export type CustomRequest = FastifyRequest<{
    Body: User;
    Params: {id: string};
}>
