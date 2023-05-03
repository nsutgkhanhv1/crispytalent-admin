import { NestExpressApplication } from '@nestjs/platform-express';
import * as csurf from 'csurf';
import { urlencoded } from 'express';

export const csrfConfigPlugin = (app: NestExpressApplication): void => {
  app.use(urlencoded({ extended: false }));
  app.use(csurf());
  app.use((req: any, res: any, next: any) => {
    const token = req.csrfToken();
    res.cookie('XSRF-TOKEN', token);
    res.locals.csrfToken = token;
    next();
  });
};
