import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Logger } from 'winston';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor (
        @Inject('winston')
        private readonly logger: Logger
    ){}

  use(req: Request, res: Response, next: NextFunction) {
      res.on('close', () => {
        const { method, path } = req;
        const { statusCode } = res;
        const message = `Path is ${path}, METHOD is ${method}, STATUS CODE is ${statusCode}`
    
        if (statusCode.toString()[0] !== '2' ) {
            this.logger.error(message);
        } else {
            this.logger.info(message);
        }
        
      })
    
    next();
  }
}
