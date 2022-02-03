import { USER_DB } from 'src/common/constants';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: USER_DB })
export class UserDB {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password?: string;
}
