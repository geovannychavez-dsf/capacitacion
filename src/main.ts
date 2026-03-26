import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { swaggerConsfig } from './config/swagger/swagger.confg';
import { RequestInterceptorInterceptor } from './common/interceptor/request-interceptor/request-interceptor.interceptor';
import { ConfigService } from '@nestjs/config';
import { TOKENSENV } from './common/types/type-orm';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';

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
