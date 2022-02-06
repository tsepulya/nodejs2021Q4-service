import { COLUMN_DB } from 'src/common/constants';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BoardDB } from './board.entity';

@Entity({ name: COLUMN_DB })
export class ColumnDB {
  @ApiProperty({example: '56629930-ba59-436e-94a7-ca29b294f3e9', description: 'Unic id'})
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({example: 'New column', description: 'Column`s title'})
  @Column()
  title!: string;

  @ApiProperty({example: 7, description: 'Column`s order'})
  @Column()
  order!: number;

  @ManyToOne(() => BoardDB, (board) => board.columns, { onDelete: 'CASCADE' })
  board!: BoardDB;
}
