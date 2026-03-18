import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestInterceptorInterceptor } from './request-interceptor/request-interceptor.interceptor';
import { VersioningType } from '@nestjs/common';
import { HeaderGuard } from './header/header.guard';
import { SwaggerConsfig } from './config/swagger.confg';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new RequestInterceptorInterceptor());
  app.useGlobalGuards(new HeaderGuard());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  SwaggerConsfig({
    title: 'Documento practico Usuarios',
    description: 'API practica de Usuarios',
    version: '1.0',
    app,
  });
  SwaggerConsfig({
    title: 'Documento practico Usuarios V2',
    description: 'API practica de Usuarios',
    version: '2.0',
    app,
  });
  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
