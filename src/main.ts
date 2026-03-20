import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { swaggerConsfig } from './config/swagger/swagger.confg';
import { RequestInterceptorInterceptor } from './common/interceptor/request-interceptor/request-interceptor.interceptor';
import { HeaderGuard } from './common/guard/header/header-guard';
import { ConfigService } from '@nestjs/config';
import { TOKENSENV } from './common/types/type-orm';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new RequestInterceptorInterceptor());
  app.useGlobalGuards(new HeaderGuard());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
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
