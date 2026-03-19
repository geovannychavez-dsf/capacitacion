import { IUsertransactionrepository } from '../user-repository.interface';
import { TOKENSORM } from 'src/common/types/token-orm';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserTransactionRepository implements IUsertransactionrepository {
  constructor(@Inject(TOKENSORM.USER_TRANSACTION) private readonly dataSource: PrismaClient) {}
  execute<T>(work: () => Promise<T>): Promise<T> {
    return this.dataSource.transaction(async () => {
      return await work();
    });
  }
}
