import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { TaskDB } from 'src/tasks/entities/task.entity';
import { UserDB } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersHashHelper } from './users.hashHelper';
import { Logger } from 'winston';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<UserDB>,
    private usersHashHelper: UsersHashHelper,
    @Inject('TASK_REPOSITORY')
    private tasksRepository: Repository<TaskDB>,
    @Inject('winston')
    private readonly logger: Logger
    
  ) {}

  async findAll() {
    const users = await this.usersRepository.find();
    const usersShown = users.map((obj) => ({ ...obj }));
    usersShown.forEach((elem) => {
      const elem1 = elem;
      delete elem1.password;
    });
    return usersShown;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      this.logger.error(`User with such ID ${id} doesn't exist`);
      throw new NotFoundException(`User with such ID ${id} doesn't exist`);
    }
    return user;
  }

  async findByProps(login: string) {
    const user = await this.usersRepository.findOne({ where: { login } });
    if (!user) {
      return null;
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const { name, login, password } = createUserDto;
    const hashedPassword = await this.usersHashHelper.hashPassword(password);

    const user = {
      id: uuidv4(),
      name,
      login,
      password: hashedPassword,
    };

    const userNew = await this.usersRepository.create(user);
    await this.usersRepository.save(userNew);

    const userShown = { id: user.id, name: user.name, login: user.login };
    return userShown;
  }

  async update(id: string, createUserDto: CreateUserDto) {
    const { name, login, password } = createUserDto;
    const hashedPassword = await this.usersHashHelper.hashPassword(password);

    const userShown = { id, name, login };

    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with such ID ${id} doesn't exist`);
    }
    const newUser = {
      ...createUserDto,
      id,
      password: hashedPassword,
    };
    this.usersRepository.merge(user, newUser);
    await this.usersRepository.save(newUser);
    return userShown;
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with such ID ${id} doesn't exist`);
    }
    await this.usersRepository.delete(id);

    await this.tasksRepository.update({ userId: id }, { userId: null });

    return `User ${id} has been removed`;
  }
}
