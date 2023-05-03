import { NestExpressApplication } from '@nestjs/platform-express';
import { I18n } from 'i18n';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';

export const setI18nPlugin = (app: NestExpressApplication) => {
  app.use(cookieParser());

  const i18n = new I18n({
    locales: ['en', 'vi'],
    directory: join(__dirname, '../../locales'),
    cookie: 'lang',
    syncFiles: true,
    autoReload: true,
    updateFiles: true,
  });
  app.use(i18n.init);
};
