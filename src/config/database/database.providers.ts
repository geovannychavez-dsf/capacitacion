import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ENV } from 'src/common/types/type-orm';
import { Characters } from 'src/modules/characters/entity/characters.entity';
import { User } from 'src/modules/usuarios/entity/user-model.entity';
import { Order } from 'src/modules/usuarios/entity/order-model.entity';
import { RefreshToken } from 'src/modules/auth/entities/refresh-token.entity';
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
      const dataSource = new DataSource({
        type: 'mssql',
        host: config.get(ENV.HOSTDB),
        username: config.get(ENV.USERDB),
        password: config.get(ENV.PASS),
        database: config.get(ENV.DATABASE),
        synchronize: false,
        logging: true,
        options: {
          encrypt: false,
          trustServerCertificate: true,
        },
        entities: [User, Order, Characters, RefreshToken],
        migrations: ['dist/migrations/*{.ts,.js}'],
        subscribers: [],
      });

      return dataSource.initialize();
    },
  },
];
