import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from "uuid";
import { UserDB } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersHashHelper } from './users.hashHelper';

@Injectable()
export class UsersService {

  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<UserDB>,
    private usersHashHelper: UsersHashHelper
  ) {}

  async findAll() {
    const users = await this.usersRepository.find();
    const usersShown = users.map(obj => ({...obj}));
    usersShown.forEach(elem => {
      const elem1 = elem;
      delete elem1.password;
    });
    return usersShown;
  }

  async findOne(id: string) {

    const user = await this.usersRepository.findOne(id);
    // if (!user) {
    //   reply.code(404);
    //   log.error(`User with such ID ${id} doesn't exist`);
    //   throw new CustomError(`User with such ID ${id} doesn't exist`, 404);
    // }
    return user;
  }

  
  async create(createUserDto: CreateUserDto) {
    const { name, login, password } = createUserDto;
    const hashedPassword = await this.usersHashHelper.hashPassword(password);

    const user = {
      id: uuidv4(),
      name,
      login,
      password: hashedPassword
    }

    const userNew = await this.usersRepository.create(user);
    await this.usersRepository.save(userNew);

    const userShown = {id: user.id, name: user.name, login: user.login};
    return userShown;
  }

  async update(id: string, createUserDto: CreateUserDto) {
    const { name, login, password } = createUserDto;
    const hashedPassword = await this.usersHashHelper.hashPassword(password);
    // const newUser = {
    //   ...req.body,
    //   password: hashedPassword
    // }
  
    const userShown = { id, name, login };
  
    const user = await this.usersRepository.findOne(id);
    // if (!user) {
    //   reply.code(404);
    //   log.error(`User with such ID ${id} doesn't exist`);
    //   throw new CustomError(`User with such ID ${id} doesn't exist`, 404);
    // }
      const newUser = {
      ...createUserDto,
      id,
      password: hashedPassword
    }
    this.usersRepository.merge(user, newUser);
    await this.usersRepository.save(newUser);
    return userShown;
    

  }

  async remove(id: string) {

    await this.usersRepository.delete(id);

    // const taskRepository = getRepository(TaskDB);
    // await taskRepository.update({ userId: id }, { userId: null });

  return `User ${id} has been removed`;
  }
}