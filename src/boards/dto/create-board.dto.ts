import { IsNotEmpty, IsString, IsArray, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Column {
  @ApiProperty({example: 'New column', description: 'Column`s title'})
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({example: 7, description: 'Column`s order'})
  @IsNotEmpty()
  @IsInt()
  order!: number;

  @IsString()
  id?: string;
}

export class CreateBoardDto {
  @ApiProperty({example: 'New board', description: 'Board`s title'})
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({example: [{"title": "Backlog", "order": 1}], description: 'Board`s columns'})
  @IsNotEmpty()
  @IsArray()
  columns!: Column[];
}
