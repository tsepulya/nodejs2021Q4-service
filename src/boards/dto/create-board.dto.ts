import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export type Column = {
  title: string;
  order: number;
  id?: string;
};

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsArray()
  columns!: Array<Column>;
}
