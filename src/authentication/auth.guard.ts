import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { SECRET_KEY } from 'src/common/config';
import { BEARER } from 'src/common/constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const authHeader = request.headers.authorization;

      if (authHeader !== undefined) {
        const tokenStr = request.headers.authorization;
        if (tokenStr) {
          const [type, token] = tokenStr.split(' ');

          if (type !== BEARER) {
            throw new UnauthorizedException('Unauthorized user');
          }
          try {
            jwt.verify(token, SECRET_KEY);
            return true;
          } catch (e) {
            throw new UnauthorizedException('Unauthorized user');
          }
        } else {
          throw new UnauthorizedException('Unauthorized user');
        }
      } else {
        throw new UnauthorizedException('Unauthorized user');
      }
    } catch (e) {
      throw new UnauthorizedException('Unauthorized user');
    }
  }
}
