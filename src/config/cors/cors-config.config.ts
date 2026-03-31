import { INestApplication, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV } from 'src/common/types/type-orm';

export const corsOptions = ({ app }: { app: INestApplication }) => {
  const config = app.get(ConfigService);
  const allowedOrigins = new Set(config.get<string>(ENV.ALLOWED_ORIGINS).split(','));
  return {
    origin: (origin: string, callback: (error: Error | null, allowed: boolean) => void) => {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
      } else {
        callback(new NotFoundException('Origen no permitido desde el cliente'), false);
      }
    },
    methods: config.get<string>(ENV.METHODS),
    allowedHeaders: config.get<string>(ENV.ALLOWED_HEADER),
    credentials: true,
  };
};
