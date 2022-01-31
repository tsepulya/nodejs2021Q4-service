import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { LoginSignToken } from './login.signToken';

@Injectable()
export class LoginService {
  constructor(private readonly loginSignToken: LoginSignToken) {}

  async create(createLoginDto: CreateLoginDto) {
    // return 'This action adds a new login';

    const { login, password } = createLoginDto;

    if (!login || !password || Object.keys(createLoginDto).length !== 2) {
      // res.status(403).send('Wrong login/password combination');
      // log.error('Wrong login/password combination');
      // throw new CustomError('Wrong login/password combination', 403);
      return 'Change to error';
    }
    const token = await this.loginSignToken.signToken(login, password);

    if (!token) {
      // res.status(403).send('Wrong login/password combination');
      // log.error('Wrong login/password combination');
      // throw new CustomError('Wrong login/password combination', 403);
      return 'Change to error';
    }
    return { token };
  }
}
