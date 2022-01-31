import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLoginDto {
  @IsNotEmpty()
  @IsString()
  login!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}
