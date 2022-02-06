import { ApiProperty } from '@nestjs/swagger';
import { USER_DB } from 'src/common/constants';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: USER_DB })
export class UserDB {
  @ApiProperty({example: '56629930-ba59-436e-94a7-ca29b294f3e9', description: 'Unic id'})
  @PrimaryColumn()
  id!: string;

  @ApiProperty({example: 'Alex', description: 'Name of user'})
  @Column()
  name!: string;

  @ApiProperty({example: 'Somebody', description: 'User`s login'})
  @Column()
  login!: string;

  @Column()
  password?: string;
}
