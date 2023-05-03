import {
  Get,
  Controller,
  Render,
  Req,
  Res,
  UseGuards,
  Next,
  UseFilters,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AppService } from './app.service';
import { AuthenticatedGuard } from '@shared/guards/authenticated.guard';
import { AuthExceptionFilter } from '@shared/filters/auth-exceptions.filter';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  async root(@Res() res: Response, @I18n() i18n: I18nContext) {
    return res.render(this.appService.getViewName(), {
      message: i18n.t('test.HELLO'),
      title: i18n.t('test.PRODUCT.NEW', {
        args: { name: 'maskedhero1002' },
      }),
      arrayItem: i18n.t('test.ARRAY.0'),
    });
  }

  @Get('/switch-lang/:lang')
  switch(@Res() res: Response, @Req() req: Request) {
    const lang = req.params.lang;
    res.cookie('lang', lang, { maxAge: 900000 });
    return res.redirect('back');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/index')
  @Render('home')
  getHome(@Req() req) {
    return { user: req.user };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  @Render('profile')
  getProfile(@Req() req) {
    return { user: req.user };
  }

  @Get('/logout')
  logout(@Req() req, @Res() res: Response, @Next() next): void {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  }

  @Get('/test')
  @Render('index')
  getIndex(@Req() req) {
    return { layout: 'index' };
  }
}
