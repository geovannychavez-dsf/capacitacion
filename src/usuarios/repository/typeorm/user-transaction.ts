import { Inject, Injectable } from '@nestjs/common';
import { IUsertransactionrepository } from '../user-repository.interface';
import { DataSource } from 'typeorm';
import { TOKENSORM } from 'src/common/types/token-orm';

@Injectable()
export class UserTransactionRepository implements IUsertransactionrepository {
  constructor(@Inject(TOKENSORM.USER_TRANSACTION) private readonly dataSource: DataSource) {}
  execute<T>(work: () => Promise<T>): Promise<T> {
    return this.dataSource.transaction(async () => {
      return await work();
    });
  }
}
