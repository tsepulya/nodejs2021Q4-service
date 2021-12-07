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