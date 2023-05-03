import {
  sideMenuConfig,
  cssMustHaveConfig,
  colorCss,
  jsMustHaveConfig,
} from './config';
import { NestExpressApplication } from '@nestjs/platform-express';

export const setLocalsPlugin = (app: NestExpressApplication) => {
  app.setLocal('sideMenu', sideMenuConfig);
  app.setLocal('cssMustHave', cssMustHaveConfig);
  app.setLocal('colorCss', colorCss);
  app.setLocal('jsMustHave', jsMustHaveConfig);
  app.use(function (req, res, next) {
    res.locals.baseUrl = `${req.protocol}://${req.get('host')}`;
    next();
  });
};
