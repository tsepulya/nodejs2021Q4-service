import { FastifyRequest } from "fastify";

export type User = {
    name: string;
    login: string;
    password?: string;
    id: string;
};

export type UserNew = {
    name: string;
    login: string;
    password: string;
};

export type CustomRequest = FastifyRequest<{
    Body: UserNew;
    Params: {id: string};
}>