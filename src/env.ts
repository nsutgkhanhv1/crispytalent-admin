import * as dotenv from 'dotenv';
import * as path from 'path';

import {
  getOsEnv,
  getOsEnvOptional,
  normalizePort,
  toBool,
  toNumber,
} from '@common/lib/env';

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({
  path: path.join(
    process.cwd(),
    `.env.${process.env.NODE_ENV || 'development'}.local`,
  ),
});
/**
 * Environment variables
 */
export const env = {
  node: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',
  appPath: __dirname,
  app: {
    port: normalizePort(process.env.PORT || getOsEnv('APP_PORT')),
    urlApi: getOsEnv('APP_URL_API'),
    fileSystemDriver: getOsEnv('FILESYSTEM_DRIVER'),
    disksDir: getOsEnv('DISKS_DIR') || '/public/uploads',
  },
  session: { secret: getOsEnv('SESSION_SECRET') },
  wallet: {
    privateKey: getOsEnv('METAMASK_PRIVATE_KEY'),
  },
  db: {
    dialect: getOsEnv('DB_CONNECTION'),
    host: getOsEnvOptional('DB_HOST'),
    port: toNumber(getOsEnvOptional('DB_PORT')),
    username: getOsEnvOptional('DB_USERNAME'),
    password: getOsEnvOptional('DB_PASSWORD'),
    database: getOsEnv('DB_DATABASE'),
    synchronize: toBool(getOsEnvOptional('DB_SYNCHRONIZE')),
    logging: getOsEnv('DB_LOGGING') === 'true',
    storage: getOsEnvOptional('DB_STORAGE'),
  },
};
