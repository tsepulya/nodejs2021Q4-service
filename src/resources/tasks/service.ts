import { tasks } from "./db";
import { Task } from "./types";

/**
 * Returns the array of tasks
 * @returns the array of tasks
 */

export const getAllTasks = () => tasks;

/**
 * Add a new task in the array of tasks
 * @param task - new task with type <Task>
 * @returns Add task in the array of tasks
 */

export const addInTasks = (task: Task) => tasks.push(task);

/**
 * Delete task from the array of tasks
 * @param id - tasks`s id
 * @returns Delete task with such id from array of tasks
 */

export const deleteInTasks = (id: string) => {
    const index = tasks.findIndex(item => item.id === id);
    tasks.splice(index, 1);
}

/**
 * Change task`s properties in the array of tasks
 * @param id - task`s id
 * @param newUser - task (type <Task>) with changed properties
 * @returns change task`s properties in the array of tasks
 */

export const changeInTasks = (id: string, newTask: Task) => {
    const taskNew = tasks.find(elem => elem.id === id);
    if (taskNew) {
        taskNew.title = newTask.title;
        taskNew.order = newTask.order;
        taskNew.description = newTask.description;
        taskNew.userId = newTask.userId;
        taskNew.boardId = newTask.boardId;
        taskNew.columnId = newTask.columnId;
    }
}
