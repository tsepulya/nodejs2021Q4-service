import { users } from "./db";
import { User } from './types';

/**
 * Returns the array of users
 * @returns the array of users
 */

export const getAllUsers = () => users;

/**
 * Add a new user in the array of users
 * @param user - new user with type <User>
 * @returns Add user in the array of users
 */

export const addInUsers = (user: User) => users.push(user);

/**
 * Delete user from the array of users
 * @param id - user's id
 * @returns Delete user with such id from array of users
 */

export const deleteInUsers = (id: string) => {
    const index = users.findIndex(item => item.id === id);
    users.splice(index, 1);
}

/**
 * Change user's properties in the array of users
 * @param id - user's id
 * @param newUser - user (type <User>) with changed properties
 * @returns change user's properties in the array of users
 */

export const changeInUsers = (id: string, newUser: User) => {
    const userNew = users.find(elem => elem.id === id);
    if (userNew) {
        userNew.name = newUser.name;
        userNew.login = newUser.login;
        userNew.password = newUser.password;
    }
}
