import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({example: 'New title', description: 'Task`s title'})
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({example: 5, description: 'Task`s order'})
  @IsNotEmpty()
  @IsInt()
  order!: number;

  @ApiProperty({example: 'Creation of new component', description: 'Task`s description'})
  @IsNotEmpty()
  @IsString()
  description!: string;

  @ApiProperty({example: '09876543-ba59-436e-94a7-ca29b294f3e9', description: 'User id'})
  userId!: string | null;

  @ApiProperty({example: 'edc345tg-ba59-436e-94a7-ca29b294f3e9', description: 'Board id'})
  boardId!: string | null;

  @ApiProperty({example: '567tgv78-ba59-436e-94a7-ca29b294f3e9', description: 'Column id'})
  columnId!: string | null;
}
