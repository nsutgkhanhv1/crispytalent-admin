import { Controller, Get, Render } from '@nestjs/common';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  InternalServerErrorException,
  RequestTimeoutException,
} from '@nestjs/common';
@Controller('errors')
export class ErrorsController {
  @Get('/500')
  internalServerError() {
    throw new InternalServerErrorException();
  }

  @Get('/timeout')
  requestTimeoutException() {
    throw new RequestTimeoutException();
  }
}
