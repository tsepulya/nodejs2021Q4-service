import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDB } from './entities/task.entity';

@ApiTags('Tasks')
@Controller('/boards/:idBoard/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({summary: 'Create new task'})
  @ApiResponse({status: 201, type: TaskDB})
  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Param('idBoard') idBoard: string,
  ) {
    return this.tasksService.create(createTaskDto, idBoard);
  }

  @ApiOperation({summary: 'Get all tasks'})
  @ApiResponse({status: 200, type: [TaskDB]})
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @ApiOperation({summary: 'Get task by id'})
  @ApiResponse({status: 200, type: TaskDB})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @ApiOperation({summary: 'Change task by id'})
  @ApiResponse({status: 200, type: TaskDB})
  @Put(':id')
  update(@Param('id') id: string, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.update(id, createTaskDto);
  }

  @ApiOperation({summary: 'Delete task by id'})
  @ApiResponse({status: 204})
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
