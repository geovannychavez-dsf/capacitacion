import { Injectable } from '@nestjs/common';
import { IUsertransactionPrismarepository } from '../user-repository.interface';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { PrismaTransactionManager } from 'src/common/types/type-orm';


@Injectable()
export class UserTransactionRepository implements IUsertransactionPrismarepository {
  constructor(private readonly prisma: PrismaService) {}

  async execute<T>(work: (manager: PrismaTransactionManager) => Promise<T>): Promise<T> {
    return await this.prisma.$transaction(async (manager: PrismaTransactionManager) => {
      return await work(manager);
    });
  }
}
