import { ApiProperty } from '@nestjs/swagger';
import { BOARD_DB } from 'src/common/constants';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { ColumnDB } from './column.entity';

@Entity({ name: BOARD_DB })
export class BoardDB {
  @ApiProperty({example: '56629930-ba59-436e-94a7-ca29b294f3e9', description: 'Unic id'})
  @PrimaryColumn()
  id!: string;

  @ApiProperty({example: 'New board', description: 'Board`s title'})
  @Column()
  title!: string;

  @ApiProperty({example: [{"id": "12345678-ba59-436e-94a7-ca29b294f3e9", "title": "Backlog", "order": 1}], description: 'Board`s columns'})
  @OneToMany(() => ColumnDB, (column) => column.board, {
    cascade: true,
  })
  columns!: ColumnDB[];
}
