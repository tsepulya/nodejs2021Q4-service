import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { TaskDB } from 'src/tasks/entities/task.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardDB } from './entities/board.entity';
import { BOARD_REPOSITORY, TASK_REPOSITORY } from 'src/common/constants';

const RELATIONS = { relations: ['columns'] };

@Injectable()
export class BoardsService {
  constructor(
    @Inject(BOARD_REPOSITORY)
    private boardsRepository: Repository<BoardDB>,
    @Inject(TASK_REPOSITORY)
    private tasksRepository: Repository<TaskDB>,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    const { title, columns } = createBoardDto;
    const board = {
      id: uuidv4(),
      title,
      columns,
    };

    await this.boardsRepository.create(board);
    await this.boardsRepository.save(board);

    return board;
  }

  async findAll() {
    return this.boardsRepository.find(RELATIONS);
  }

  async findOne(id: string) {

    const board = await this.boardsRepository.findOne(id, RELATIONS);
    if (!board) {
      throw new NotFoundException(`Board with such ID ${id} doesn't exist`);
    }

    return board;
  }

  async update(id: string, createBoardDto: CreateBoardDto) {

    const board = await this.boardsRepository.findOne(id);
    if (!board) {
      throw new NotFoundException(`Board with such ID ${id} doesn't exist`);
    }
    const updatedBoard = { ...board, ...createBoardDto };
    await this.boardsRepository.save(updatedBoard);
    const newBoard = await this.boardsRepository.findOne(id, RELATIONS);
    return newBoard;
  }

  async remove(id: string) {

    const board = await this.boardsRepository.findOne(id);
    if (!board) {
      throw new NotFoundException(`Board with such ID ${id} doesn't exist`);
    }

    await this.boardsRepository.delete(id);

    await this.tasksRepository.delete({ boardId: id });

    return `Board ${id} has been removed`;
  }
}
