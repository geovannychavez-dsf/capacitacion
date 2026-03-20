import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMssql } from '@prisma/adapter-mssql';
import { ConfigService } from '@nestjs/config';
import { TOKENSENV } from 'src/common/types/type-orm';

@Injectable()
export class PrismaService implements OnModuleInit {
  private client: PrismaClient;
  constructor(private readonly config: ConfigService) { }
  async onModuleInit(): Promise<void> {
    const adapter = new PrismaMssql({
      server: this.config.get(TOKENSENV.HOSTDB),
      user: this.config.get(TOKENSENV.USERDB),
      password: this.config.get(TOKENSENV.PASS),
      database: this.config.get(TOKENSENV.DATABASE),
      port: 1433,
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    });

    this.client = new PrismaClient({ adapter });
    await this.client.$connect();
  }

  get user() { return this.client.user; }
  get order() { return this.client.order; }
  get perfil() { return this.client.perfil; }

  $transaction<T>(fn: (prisma: Omit<PrismaClient, '$transaction' | '$connect' | '$disconnect' | '$on' | '$use' | '$extends'>) => Promise<T>): Promise<T> {
    return this.client.$transaction(fn);
  }
}
