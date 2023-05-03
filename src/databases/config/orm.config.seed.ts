import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from './index';
import { join } from 'path';

const options = config as TypeOrmModuleOptions;

const typeOrmConfig: TypeOrmModuleOptions = {
  ...options,
  entities: [join(__dirname, '..', '../entity/index.{js,ts}')],
};

export default typeOrmConfig;
