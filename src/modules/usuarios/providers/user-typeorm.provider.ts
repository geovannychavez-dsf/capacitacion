import { DataSource, Repository } from 'typeorm';
import { TOKENSORM } from 'src/common/types/type-orm';
import { User } from '../entity/user-model.entity';
import { Order } from '../entity/order-model.entity';
import { UserRepository } from '../repository/typeorm/user-typyorm.repository';
import { UserTransactionRepository } from '../repository/typeorm/user-transaction.repository';

export const userProviders = [
  {
    provide: TOKENSORM.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [TOKENSORM.DATA_SOURCE],
  },
  {
    provide: TOKENSORM.ORDER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Order),
    inject: [TOKENSORM.DATA_SOURCE],
  },
  {
    provide: TOKENSORM.USER_SERVICE_REPOSITORY,
    useFactory: (
      userRepo: Repository<User>,
      orderRepo: Repository<Order>,
      dataSouser: DataSource,
    ) => new UserRepository(userRepo, orderRepo, dataSouser),
    inject: [TOKENSORM.USER_REPOSITORY, TOKENSORM.ORDER_REPOSITORY, TOKENSORM.DATA_SOURCE],
  },
  {
    provide: TOKENSORM.USER_TRANSACTION,
    useFactory: (dataSource: DataSource) => new UserTransactionRepository(dataSource),
    inject: [TOKENSORM.DATA_SOURCE],
  },
];
