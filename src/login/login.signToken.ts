import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { SECRET_KEY } from 'src/common/config';
import { UsersHashHelper } from 'src/users/users.hashHelper';
import { UsersService } from 'src/users/users.service';


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
        const token = jwt.sign({ id, login }, SECRET_KEY);
        return token;
      }
    }
    return null;
  }
}
