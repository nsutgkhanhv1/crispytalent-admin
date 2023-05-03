import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'express-handlebars';
import { capitalizeText } from '@utils/capitalize';

export const hbsInitPlugin = (app: NestExpressApplication) => {
  app.setBaseViewsDir(join(__dirname, '../../..', 'views'));
  app.engine(
    'hbs',
    hbs.engine({
      extname: 'hbs',
      defaultLayout: 'main',
      layoutsDir: join(__dirname, '../../..', 'views', 'layouts'),
      partialsDir: join(__dirname, '../../..', 'views', 'partials'),
      helpers: {
        section: function (name, options) {
          if (!this._sections) this._sections = {};
          this._sections[name] = options.fn(this);
          return null;
        },
        capitalize: function (string: string) {
          return capitalizeText(string);
        },
        renderCaret: function (operand_1: any) {
          if (parseFloat(operand_1) >= 0) {
            return `<i class="fa fa-caret-up growth-rate-up"></i>`;
          } else {
            return `<i class="fa fa-caret-down growth-rate-down"></i>`;
          }
        },
      },
    }),
  );
  app.setViewEngine('hbs');
};
