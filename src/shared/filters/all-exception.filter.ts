import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';

interface HttpError extends Error {
  code?: string;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof NotFoundException) {
      return response.status(404).render('404', { layout: false });
    }

    if (exception instanceof InternalServerErrorException) {
      return response.status(500).render('500');
    }

    if (exception instanceof HttpException) {
      return response.status(exception.getStatus()).render('errors', {
        layout: false,
        errorStatus: exception.getStatus(),
        errorName: exception.name,
        errorMessage: exception.message,
      });
    }

    // When exception is not instance of HttpException
    const error = exception as unknown as HttpError;
    // CSRF token validation fails error
    if (error.code === 'EBADCSRFTOKEN') {
      return response.status(403).render('errors', {
        layout: false,
        errorStatus: 403,
        errorName: error.name,
        errorMessage: error.message,
      });
    } else {
      return response.status(500).render('errors', {
        layout: false,
        errorStatus: 500,
        errorName: error.name,
        errorMessage: error.message,
      });
    }
  }
}
