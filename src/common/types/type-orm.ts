import { PrismaClient } from "@prisma/client";

export const TOKENSORM = {
  USER_TRANSACTION: 'USER_TRANSACTION',
  USER_REPOSITORY: 'USER_REPOSITORY',
  ORDER_REPOSITORY: 'ORDER_REPOSITORY',
  DATA_SOURCE: 'DATA_SOURCE',
  USER_SERVICE_REPOSITORY: 'USER_SERVICE_REPOSITORY',
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
export const PASSWORD_ADMIN = 'admin';

export const JWT_CONFIG = {
  SECRET: process.env.JWT_SECRET,
  EXPIRE: process.env.JWT_EXPIRES_IN,
};
export type PrismaTransactionManager = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$use' | '$extends' | '$transaction'>;