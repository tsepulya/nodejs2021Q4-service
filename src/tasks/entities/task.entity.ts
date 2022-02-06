import { ApiProperty } from '@nestjs/swagger';
import { TASK_DB } from 'src/common/constants';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: TASK_DB })
export class TaskDB {
  @ApiProperty({example: 'vbn345rf-ba59-436e-94a7-ca29b294f3e9', description: 'Unic id'})
  @PrimaryColumn()
  id!: string;

  @ApiProperty({example: 'New title', description: 'Task`s title'})
  @Column()
  title!: string;

  @ApiProperty({example: 5, description: 'Task`s order'})
  @Column()
  order!: number;

  @ApiProperty({example: 'Creation of new component', description: 'Task`s description'})
  @Column()
  description?: string;

  @ApiProperty({example: '09876543-ba59-436e-94a7-ca29b294f3e9', description: 'User id'})
  @Column('varchar', { nullable: true })
  userId?: string | null = null;

  @ApiProperty({example: 'edc345tg-ba59-436e-94a7-ca29b294f3e9', description: 'Board id'})
  @Column('varchar', { nullable: true })
  boardId?: string | null = null;

  @ApiProperty({example: '567tgv78-ba59-436e-94a7-ca29b294f3e9', description: 'Column id'})
  @Column('varchar', { nullable: true })
  columnId?: string | null = null;
}
