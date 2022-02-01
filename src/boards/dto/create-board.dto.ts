import { IsNotEmpty, IsString, IsArray, IsInt } from 'class-validator';

export class Column {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsInt()
  order!: number;

  @IsString()
  id?: string;
}

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsArray()
  columns!: Column[];
}
