import { Injectable } from '@nestjs/common';
import { Usertransactionrepository } from '../../interfaces/user-repository.interface';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class UserTransactionRepository implements Usertransactionrepository {
  constructor(private readonly dataSource: DataSource) {}
  execute<T>(work: (manager: EntityManager) => Promise<T>): Promise<T> {
    return this.dataSource.transaction(async (manager: EntityManager) => {
      return await work(manager);
    });
  }
}
