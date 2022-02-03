import { TASK_DB } from 'src/common/constants';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: TASK_DB })
export class TaskDB {
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @Column()
  description?: string;

  @Column('varchar', { nullable: true })
  userId?: string | null = null;

  @Column('varchar', { nullable: true })
  boardId?: string | null = null;

  @Column('varchar', { nullable: true })
  columnId?: string | null = null;
}
