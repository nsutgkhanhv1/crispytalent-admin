import {
  Controller,
  Get,
  Render,
  UseGuards,
  UseFilters,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';

import { AuthenticatedGuard } from '@shared/guards/authenticated.guard';
import { AuthExceptionFilter } from '@shared/filters/auth-exceptions.filter';

import { UsersService } from './users.service';
import { DataTableQuery } from '@decorators/datatable_query.decorator';
import { updateUserDto } from './users.dto';

@UseFilters(AuthExceptionFilter)
@Controller('users')
// @UseGuards(AuthenticatedGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}
}
