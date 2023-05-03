import {
  Controller,
  Get,
  Post,
  Res,
  Render,
  UseGuards,
  Req,
  UseFilters,
  Next,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { LoginGuard } from '@shared/guards/login.guard';
import { AuthExceptionFilter } from '@shared/filters/auth-exceptions.filter';

@Controller('auth')
@UseFilters(AuthExceptionFilter)
export class AuthController {
  @Get('/login')
  @Render('auth/singin')
  singIn(@Req() req: Request) {
    const message: string = req.flash('loginError')[0];
    const displayError = message ? 'block' : 'none';

    return {
      layout: 'singin',
      message,
      displayError,
    };
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  login(@Res() res: Response): void {
    res.redirect('/index');
  }

  @Get('/logout')
  logout(@Req() req, @Res() res: Response, @Next() next): void {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/auth/login');
    });
  }
}
