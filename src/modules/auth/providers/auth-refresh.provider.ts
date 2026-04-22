import { DataSource } from 'typeorm';
import { TOKENSORM } from 'src/common/types/type-orm';
import { RefreshToken } from '../entities/refresh-token.entity';
import { RefreshTokenRepository } from '../repository/refresh-token.repository';

export const authProviders = [
  {
    provide: TOKENSORM.REFRESH_TOKEN_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      new RefreshTokenRepository(dataSource.getRepository(RefreshToken)),
    inject: [TOKENSORM.DATA_SOURCE],
  },
];
