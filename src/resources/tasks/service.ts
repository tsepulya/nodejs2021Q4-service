import { tasks } from "./db";
import { Task } from "./types";

export const getAllTasks = () => tasks;

export const addInTasks = (task: Task) => tasks.push(task);

export const deleteInTasks = (id: string) => {
    const index = tasks.findIndex(item => item.id === id);
    tasks.splice(index, 1);
}

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
