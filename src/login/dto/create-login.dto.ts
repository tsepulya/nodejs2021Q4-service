import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLoginDto {
  @ApiProperty({example: 'Somebody', description: 'User`s login'})
  @IsNotEmpty()
  @IsString()
  login!: string;

  @ApiProperty({example: '12345', description: 'User`s password'})
  @IsNotEmpty()
  @IsString()
  password!: string;
}

export class TokenDto {
  @ApiProperty({example: 'qwertGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2NjI5OTMwLWJhNTktNDM2ZS05NGE3LWNhMjliMjk0ZjNlOSIsImxvZ2luIjoiYWRtaW4iLCJpYXQiOjE2NDQxNjczOTJ9.jzigBU4C8FQe4TIMYrYrcS6E9865LRuD5p-NB-CgWUU', description: 'User`s token'})
  token!: string;
}
