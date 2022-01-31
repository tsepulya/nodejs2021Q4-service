import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersHashHelper } from 'src/users/users.hashHelper';
import { UsersService } from 'src/users/users.service';

const SECRET = 'SOME_SECRET';

@Injectable()
export class LoginSignToken {
  constructor(
    private usersHashHelper: UsersHashHelper,
    private usersService: UsersService,
  ) {}

  async signToken(somelogin: string, password: string) {
    const user = await this.usersService.findByProps(somelogin);

    if (!user) {
      return null;
    }
    const { password: hashedPassword } = user;
    if (hashedPassword) {
      const isSimilar = await this.usersHashHelper.checkPassword(
        password,
        hashedPassword,
      );
      if (isSimilar) {
        const { id, login } = user;
        const token = jwt.sign({ id, login }, SECRET);
        return token;
      }
    }
    return null;
  }
}
