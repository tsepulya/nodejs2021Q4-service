import { users } from "./db";
import { User } from './types';

export const getAllUsers = () => users;

export const addInUsers = (user: User) => users.push(user);

export const deleteInUsers = (id: string) => {
    // users = users.filter((elem) => elem.id !== id);
    const index = users.findIndex(item => item.id === id);
    users.splice(index, 1);
}

export const changeInUsers = (id: string, newUser: User) => {
    const userNew = users.find(elem => elem.id === id);
    if (userNew) {
        userNew.name = newUser.name;
        userNew.login = newUser.login;
        userNew.password = newUser.password;
    }
}