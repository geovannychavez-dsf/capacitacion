import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  return SwaggerModule.setup('docs', app, documentFactory);
}
