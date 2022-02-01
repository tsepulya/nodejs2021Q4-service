import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { Response } from "express";

@Catch(InternalServerErrorException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}

// @Catch()
// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(error: Error, host: ArgumentsHost) {
//     const response = host.switchToHttp().getResponse();
//     const status = (error instanceof HttpException) ? error.getStatus(): HttpStatus.INTERNAL_SERVER_ERROR;

//     if (status === HttpStatus.UNAUTHORIZED) 
//         return response.status(status).render('views/401');
//     if (status === HttpStatus.NOT_FOUND) 
//         return response.status(status).render('views/404');
//     if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
//         if (process.env.NODE_ENV === 'production') {
//           console.error(error.stack);
//           return response.status(status).render('views/500');
//         }
//         else {
//           const message = error.stack;
//           return response.status(status).send(message); 
//         } 
//     }
//   }
// }