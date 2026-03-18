import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestInterceptorInterceptor } from './request-interceptor/request-interceptor.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import { HeaderGuard } from './header/header.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new RequestInterceptorInterceptor());
  app.useGlobalGuards(new HeaderGuard());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  const config = new DocumentBuilder()
    .setTitle('Documento practico Usuarios V1')
    .setDescription('API practica de Usuarios GET, POST, PUT')
    .setVersion('1.0')
    .addBasicAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  const configV2 = new DocumentBuilder()
    .setTitle('Documento practico Usuarios V2')
    .setDescription('API practica de Usuarios GET, POST, PUT')
    .setVersion('2.0')
    .addBasicAuth()
    .build();
  const documentFactoryV2 = () => SwaggerModule.createDocument(app, configV2);
  SwaggerModule.setup('docs', app, documentFactory);
  SwaggerModule.setup('docs/v2', app, documentFactoryV2, {});
  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
