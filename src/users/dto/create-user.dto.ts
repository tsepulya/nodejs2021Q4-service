import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({example: 'Alex', description: 'Name of user'})
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({example: 'Somebody', description: 'User`s login'})
  @IsNotEmpty()
  @IsString()
  login!: string;

  @ApiProperty({example: '12345', description: 'User`s password'})
  @IsNotEmpty()
  @IsString()
  password!: string;
}
