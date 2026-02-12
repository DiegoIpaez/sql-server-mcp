import { PrismaClient } from '../../generated/prisma/client';
import { PrismaMssql } from '@prisma/adapter-mssql';
import { env } from './env';

const config = {
  user: env['DB_USER'],
  password: env['DB_PASSWORD'],
  database: env['DB_NAME'],
  server: env['DB_HOST'],
  port: env['DB_PORT'],
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 20000,
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const adapter = new PrismaMssql(config);
const prisma = new PrismaClient({ adapter });

export { prisma };
