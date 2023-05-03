import { NestExpressApplication } from '@nestjs/platform-express';
import * as passport from 'passport';
import * as session from 'express-session';
import { env } from '@env';

export const passortInitPlugin = (app: NestExpressApplication) => {
  app.use(
    session({
      secret: env.session.secret,
      resave: false,
      cookie: {},
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
};
