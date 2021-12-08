import { boards } from "./db";
import { Board } from "./types";

export const getAllBoards = () => boards;

export const addInBoards = (board: Board) => boards.push(board);

export const deleteInBoards = (id: string) => {
    const index = boards.findIndex(item => item.id === id);
    boards.splice(index, 1);
}

export const changeInBoards = (id: string, newBoard: Board) => {
    const boardNew = boards.find(elem => elem.id === id);
    if (boardNew) {
        boardNew.title = newBoard.title;
        boardNew.columns = newBoard.columns;
    }
}
