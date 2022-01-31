import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsInt()
  order: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;
}
