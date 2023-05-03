import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import flash = require('connect-flash');
import {
  i18nValidationErrorFactory,
  I18nValidationExceptionFilter,
} from 'nestjs-i18n';

import { AppModule } from '@modules/app/app.module';
import { env } from '@env';
import {
  setLocalsPlugin,
  hbsInitPlugin,
  csrfConfigPlugin,
  passortInitPlugin,
  setI18nPlugin,
} from '@plugins';
import { AllExceptionFilter } from '@filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: i18nValidationErrorFactory,
      transform: true,
    }),
  );
  app.useGlobalFilters(
    new I18nValidationExceptionFilter(),
    new AllExceptionFilter(),
  );
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/public' });
  app.use(flash());

  setI18nPlugin(app);
  hbsInitPlugin(app);
  passortInitPlugin(app);
  csrfConfigPlugin(app);
  setLocalsPlugin(app);

  const port = env.app.port || 3000;

  await app.listen(port);
  console.log(`app running at http://localhost:${port}/`);
}
bootstrap();
