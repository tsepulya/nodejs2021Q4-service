import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TASK_REPOSITORY } from 'src/common/constants';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDB } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject(TASK_REPOSITORY)
    private tasksRepository: Repository<TaskDB>,
  ) {}

  async create(createTaskDto: CreateTaskDto, idBoard: string) {
    const { title, order, description, userId, columnId } = createTaskDto;
    const task = {
      id: uuidv4(),
      title,
      order,
      description,
      userId,
      boardId: idBoard,
      columnId,
    };
    const taskNew = await this.tasksRepository.create(task);
    await this.tasksRepository.save(taskNew);
    return taskNew;
  }

  async findAll() {
    return this.tasksRepository.find();
  }

  async findOne(id: string) {

    const task = await this.tasksRepository.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with such ID ${id} doesn't exist`);
    }
    return task;
  }

  async update(id: string, createTaskDto: CreateTaskDto) {
    const task = await this.tasksRepository.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with such ID ${id} doesn't exist`);
    }
    this.tasksRepository.merge(task, createTaskDto);
    await this.tasksRepository.save(task);
    return task;
  }

  async remove(id: string) {

    const task = await this.tasksRepository.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with such ID ${id} doesn't exist`);
    }
    await this.tasksRepository.delete(id);

    return `Task ${id} has been removed`;
  }
}
