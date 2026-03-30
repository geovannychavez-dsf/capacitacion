import { TOKENSORM } from 'src/common/types/type-orm';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { UserRepository } from '../repository/prisma/user-prisma.repository';
import { UserTransactionRepository } from '../repository/prisma/user-transaction.repository';

export const userPrismaProviders = [
  {
    provide: TOKENSORM.USER_SERVICE_REPOSITORY,
    useFactory: (prisma: PrismaService) => new UserRepository(prisma),
    inject: [PrismaService],
  },
  {
    provide: TOKENSORM.USER_TRANSACTION,
    useFactory: (prisma: PrismaService) => new UserTransactionRepository(prisma),
    inject: [PrismaService],
  },
];
