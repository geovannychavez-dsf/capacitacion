import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { swaggerConsfig } from './config/swagger/swagger.confg';
import { RequestInterceptorInterceptor } from './common/interceptor/request-interceptor.interceptor';
import { ConfigService } from '@nestjs/config';
import { TOKENSENV } from './common/types/type-orm';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { CorsOptions } from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new RequestInterceptorInterceptor());
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  const allowedOrigins = new Set(['http://localhost:3001', 'http://localhost:5173']);

  const corsOptions: CorsOptions = {
    origin: (origin: string, callback: (error: Error | null, allowed: boolean) => void) => {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'), false);
      }
    },
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  };

  app.enableCors(corsOptions);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableVersioning({ type: VersioningType.URI });
  swaggerConsfig({
    title: 'Documento practico Usuarios',
    description: 'API practica de Usuarios',
    version: '1.0',
    app,
  });
  const port = config.get<number>(TOKENSENV.PORT) ?? 3001;
  await app.listen(port);
}
void bootstrap();
