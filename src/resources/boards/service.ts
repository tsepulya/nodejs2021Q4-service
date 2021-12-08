import { boards } from "./db";
import { Board } from "./types";

/**
 * Returns the array of boards
 * @returns the array of boards
 */

export const getAllBoards = () => boards;

/**
 * Add a new board in the array of boards
 * @param board - new board with type <Board>
 * @returns Add board in the array of boards
 */

export const addInBoards = (board: Board) => boards.push(board);

/**
 * Delete board from the array of boards
 * @param id - board`s id
 * @returns Delete board with such id from array of boards
 */

export const deleteInBoards = (id: string) => {
    const index = boards.findIndex(item => item.id === id);
    boards.splice(index, 1);
}

/**
 * Change board`s properties in the array of boards
 * @param id - board`s id
 * @param newBoard - board (type <Board>) with changed properties
 * @returns change board`s properties in the array of boards
 */


export const changeInBoards = (id: string, newBoard: Board) => {
    const boardNew = boards.find(elem => elem.id === id);
    if (boardNew) {
        boardNew.title = newBoard.title;
        boardNew.columns = newBoard.columns;
    }
}
