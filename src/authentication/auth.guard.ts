import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

const SECRET = <string>process.env.SECRET_KEY || 'SOME_SECRET';

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

          if (type !== 'Bearer') {
            throw new UnauthorizedException('Unauthorized user');
          }
          try {
            jwt.verify(token, SECRET);
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
