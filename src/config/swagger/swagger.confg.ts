import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JWT_CONFIG } from 'src/common/types/type-orm';
interface ISwaggerConfigOptions {
  title: string;
  description: string;
  version: string;
  app: INestApplication;
}
export function swaggerConsfig({ title, description, version, app }: ISwaggerConfigOptions): void {
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Ingresa tu token JWT',
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  return SwaggerModule.setup(JWT_CONFIG.SWAGGER_ROUTE, app, documentFactory);
}
