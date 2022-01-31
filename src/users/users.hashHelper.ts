import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersHashHelper {
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async checkPassword(password: string, hash: string) {
    const isSimilar = await bcrypt.compare(password, hash);
    return isSimilar;
  }
}
