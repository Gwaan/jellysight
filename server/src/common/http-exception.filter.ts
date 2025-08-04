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
    const status = exception.getStatus();

    const res: HttpResponse = {
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: req.url,
    };

    response.status(status).json(res);
  }
}

interface HttpResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
}
