import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { swaggerConsfig } from './config/swagger.confg';
import { RequestInterceptorInterceptor } from './common/interceptor/request-interceptor/request-interceptor.interceptor';
import { HeaderGuard } from './common/guard/header/header-guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
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
  swaggerConsfig({
    title: 'Documento practico Usuarios V2',
    description: 'API practica de Usuarios',
    version: '2.0',
    app,
  });
  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
