import { BOARD_DB } from 'src/common/constants';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { ColumnDB } from './column.entity';

@Entity({ name: BOARD_DB })
export class BoardDB {
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;

  @OneToMany(() => ColumnDB, (column) => column.board, {
    cascade: true,
  })
  columns!: ColumnDB[];
}
