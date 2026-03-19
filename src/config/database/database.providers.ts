import { Order } from 'src/usuarios/entities/order-entity';
import { User } from 'src/usuarios/entities/user-entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mssql',
        host: process.env.HOSTDB,
        username: process.env.USERDB,
        password: process.env.PASS,
        database: process.env.DATABASE
        ,
        synchronize: false,
        logging: true,
        options: {
          encrypt: false,
          trustServerCertificate: true,
        },
        entities: [User, Order],
        migrations: ['dist/migrations/*{.ts,.js}'],
        subscribers: [],
      });

      return dataSource.initialize();
    },
  },
];
