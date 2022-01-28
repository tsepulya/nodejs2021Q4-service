import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from "uuid";
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardDB } from './entities/board.entity';

const RELATIONS = { relations: ['columns'] };

@Injectable()
export class BoardsService {

  constructor(
    @Inject('BOARD_REPOSITORY')
    private boardsRepository: Repository<BoardDB>,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    // return 'This action adds a new board';
    const { title, columns } = createBoardDto;
    const board = {
      id: uuidv4(),
      title,
      columns
    }

  await this.boardsRepository.create(board);
  await this.boardsRepository.save(board);

  return board;
  }

  async findAll() {
    return this.boardsRepository.find(RELATIONS);
  }

  async findOne(id: string) {
    // return `This action returns a #${id} board`;

    const board = await this.boardsRepository.findOne(id, RELATIONS);
  //   if (!board) {
  //   reply.code(404);
  //   log.error(`Board with such ID ${id} doesn't exist`);
  //   throw new CustomError(`Board with such ID ${id} doesn't exist`, 404);
  // }
    return board;
  }

  async update(id: string, createBoardDto: CreateBoardDto) {
    // return `This action updates a #${id} board`;

    const board = await this.boardsRepository.findOne(id);
  // if (!board) {
  //   reply.code(404);
  //   log.error(`Board with such ID ${id} doesn't exist`);
  //   throw new CustomError(`Board with such ID ${id} doesn't exist`, 404);
  // }
    const updatedBoard = { ...board, ...createBoardDto };
    await this.boardsRepository.save(updatedBoard);
    const newBoard = await this.boardsRepository.findOne(id, RELATIONS);
    return newBoard;
  }

  async remove(id: string) {
    // return `This action removes a #${id} board`;

    const board = await this.boardsRepository.findOne(id);
  // if (!board) {
  //   reply.code(404);
  //   log.error(`Board with such ID ${id} doesn't exist`);
  //   throw new CustomError(`Board with such ID ${id} doesn't exist`, 404);
  // }
    await this.boardsRepository.delete(id);

  // const taskRepository = getRepository(TaskDB);
  // await taskRepository.delete({ boardId: id });

    return `Board ${id} has been removed`;
  }
}
