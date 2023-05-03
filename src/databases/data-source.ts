import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import config from './config/index';

const options = config as DataSourceOptions;

const AppDataSourceOption: DataSourceOptions = {
  ...options,
  entities: [__dirname + '../entity/*.{js,ts}'],
  migrations: [__dirname + '/migration/*.{js,ts}'],
};

export const AppDataSource = new DataSource(AppDataSourceOption);
