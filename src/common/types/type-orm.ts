import { PrismaClient } from '@prisma/client';

export const TOKENSORM = {
  USER_TRANSACTION: 'USER_TRANSACTION',
  USER_REPOSITORY: 'USER_REPOSITORY',
  ORDER_REPOSITORY: 'ORDER_REPOSITORY',
  DATA_SOURCE: 'DATA_SOURCE',
  USER_SERVICE_REPOSITORY: 'USER_SERVICE_REPOSITORY',
  CHARACTER_REPOSITORY: 'CHARACTER_REPOSITORY',
  CHARACTER_SERVICE_REPOSITORY: 'CHARACTER_REPO',
};
export const TOKENSENV = {
  HOSTDB: 'HOSTDB',
  USERDB: 'USERDB',
  PASS: 'PASS',
  DATABASE: 'DATABASE',
  PORTDB: 'PORTDB',
  PORT: 'PORT',
};
export const USERNAME_ADMIN = 'admin';
export const PASSWORD_ADMIN = USERNAME_ADMIN;

export const JWT_CONFIG = {
  SECRET: 'JWT_SECRET',
  EXPIRE: 'JWT_EXPIRES_IN',
  REFRESH_SECRET: 'JWT_REFRESH_SECRET',
  REFRESH_EXPIRES_IN: 'REFRESH_EXPIRES_IN',
  REFRESH_NAME: 'refreshToken',
  RICKMORTY_URL: 'RICKMORTY_URL',
};
export const ONE_SECOND = 1000;
export const ONE_MINUTE = 60 * ONE_SECOND;
export const ONE_HOUR = 60 * ONE_MINUTE;
export const ONE_DAY = 24 * ONE_HOUR;
export type PrismaTransactionManager = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$use' | '$extends' | '$transaction'
>;
