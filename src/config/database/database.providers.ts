import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { TOKENSENV } from 'src/common/types/type-orm';
import { Characters } from 'src/modules/characters/entity/characters.entity';
import { User } from 'src/modules/usuarios/entities/user-model.entity';
import { Order } from 'src/modules/usuarios/entities/order-model.entity';
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
      const dataSource = new DataSource({
        type: 'mssql',
        host: config.get(TOKENSENV.HOSTDB),
        username: config.get(TOKENSENV.USERDB),
        password: config.get(TOKENSENV.PASS),
        database: config.get(TOKENSENV.DATABASE),
        synchronize: false,
        logging: true,
        options: {
          encrypt: false,
          trustServerCertificate: true,
        },
        entities: [User, Order, Characters],
        migrations: ['dist/migrations/*{.ts,.js}'],
        subscribers: [],
      });

      return dataSource.initialize();
    },
  },
];
