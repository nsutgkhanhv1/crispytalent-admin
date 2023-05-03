import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import databaseConfig from '@databases/config/index';

import { AuthModule } from '@modules/auth/auth.module';
import * as path from 'path';
import {
  AcceptLanguageResolver,
  CookieResolver,
  I18nModule,
} from 'nestjs-i18n';
import { ErrorsModule } from '@modules/errors/errors.module';
import { UsersModule } from '@modules/users/users.module';
import { UploadModule } from '@modules/upload/upload.module';
import { TopicsModule } from '@modules/topic/topics.modules';
import { ResultsModule } from '@modules/result/result.modules';
import { AssessmentsRepository } from '@modules/assessment/assessments.repository';
import { AssessmentsModules } from '@modules/assessment/assessments.modules';
import { TestsModules } from '@modules/test/tests.modules';

const options = databaseConfig as TypeOrmModuleOptions;

@Module({
  imports: [
    UploadModule,
    UsersModule,
    ErrorsModule,
    AuthModule,
    TopicsModule,
    ResultsModule,
    AssessmentsModules,
    TestsModules,
    TypeOrmModule.forRoot({
      ...options,
      autoLoadEntities: true,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '../../', '/i18n/'),
        watch: true,
      },
      viewEngine: 'hbs',
      resolvers: [new CookieResolver(), AcceptLanguageResolver],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
