import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from "uuid";
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDB } from './entities/task.entity';

@Injectable()
export class TasksService {

  constructor(
    @Inject('TASK_REPOSITORY')
    private tasksRepository: Repository<TaskDB>,
  ) {}

  async create(createTaskDto: CreateTaskDto, idBoard: string) {
    // return 'This action adds a new task';
    const { title, order, description, userId, columnId, boardId } = createTaskDto;
    const task = {
      id: uuidv4(),
      title,
      order,
      description,
      userId,
      boardId: idBoard,
      columnId
    }
    const taskNew = await this.tasksRepository.create(task);
    await this.tasksRepository.save(taskNew);
    return taskNew;
  }

  async findAll() {
    return this.tasksRepository.find();
  }

  async findOne(id: string) {
    // return `This action returns a #${id} task`;
    
    const task = await this.tasksRepository.findOne(id);
    return task;
  }

  async update(id: string, createTaskDto: CreateTaskDto) {
    // return `This action updates a #${id} task`;
    const task = await this.tasksRepository.findOne(id);
    // if (!task) {
    // reply.code(404);
    // log.error(`Task with such ID ${taskId} doesn't exist`);
    // throw new CustomError(`Task with such ID ${taskId} doesn't exist`, 404);
    // }
    this.tasksRepository.merge(task, createTaskDto);
    await this.tasksRepository.save(task);
    return task;
  }

  async remove(id: string) {
    // return `This action removes a #${id} task`;

    await this.tasksRepository.delete(id);
  
    return `Task ${id} has been removed`;

  }
}
