import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const statusCode: number = exception.getStatus();

    const res: HttpErrorResponse = {
      statusCode,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: req.url,
    };

    response.status(res.statusCode).json(res);
  }
}

interface HttpErrorResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
}
