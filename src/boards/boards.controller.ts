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
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardDB } from './entities/board.entity';

@ApiTags('Boards')
@Controller('boards')
@UseGuards(JwtAuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiOperation({summary: 'Create new board'})
  @ApiResponse({status: 201, type: BoardDB})
  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @ApiOperation({summary: 'Get all boards'})
  @ApiResponse({status: 200, type: [BoardDB]})
  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @ApiOperation({summary: 'Get board by id'})
  @ApiResponse({status: 200, type: BoardDB})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(id);
  }

  @ApiOperation({summary: 'Change board by id'})
  @ApiResponse({status: 200, type: BoardDB})
  @Put(':id')
  update(@Param('id') id: string, @Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.update(id, createBoardDto);
  }

  @ApiOperation({summary: 'Delete board by id'})
  @ApiResponse({status: 204})
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.boardsService.remove(id);
  }
}
