import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { LoginSignToken } from './login.signToken';

@Injectable()
export class LoginService {
  constructor(private readonly loginSignToken: LoginSignToken) {}

  async create(createLoginDto: CreateLoginDto) {

    const { login, password } = createLoginDto;

    if (!login || !password || Object.keys(createLoginDto).length !== 2) {
      throw new ForbiddenException('Wrong login/password combination');
    }
    const token = await this.loginSignToken.signToken(login, password);

    if (!token) {
      throw new ForbiddenException('Wrong login/password combination');
    }
    return { token };
  }
}
