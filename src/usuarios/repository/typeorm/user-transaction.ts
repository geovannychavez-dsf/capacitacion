import { Inject, Injectable } from '@nestjs/common';
import { IUsertransactionrepository } from '../user-repository.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class UserTransactionRepository implements IUsertransactionrepository {
  constructor(@Inject('USER_TRANSACTION') private readonly dataSource: DataSource) {}
  runInTransaction<T>(work: () => Promise<T>): Promise<T> {
    return this.dataSource.transaction(async () => {
      return await work();
    });
  }
}
