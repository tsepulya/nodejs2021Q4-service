import { COLUMN_DB } from 'src/common/constants';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BoardDB } from './board.entity';

@Entity({ name: COLUMN_DB })
export class ColumnDB {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @ManyToOne(() => BoardDB, (board) => board.columns, { onDelete: 'CASCADE' })
  board!: BoardDB;
}
