import * as path from 'path';
import * as fs from 'fs';
import { InternalServerErrorException } from '@nestjs/common';
import Handlebars from 'handlebars';
import { Difusion } from '../entities/difusion.entity';
import { TEMPLATE_WHATSAPP } from '../constants/difusion-whatsapp.constanst';

export function findFileTemplate(templateName: string): HandlebarsTemplateDelegate<any> {
  const candidates = [
    path.join(process.cwd(), 'dist', 'src', 'modules', 'difusion', 'templates', templateName),
  ];
  const templatePath = candidates.find((p) => fs.existsSync(p));
  if (!templatePath) {
    throw new InternalServerErrorException(
      `Template whatsapp.hbs no encontrado. Rutas intentadas:\n${candidates.join('\n')}`,
    );
  }
  const templateSource = fs.readFileSync(templatePath, 'utf-8');
  const template = Handlebars.compile(templateSource);

  return template;
}

export function createMessage(difusion: Difusion): string {
  const template = Handlebars.compile(TEMPLATE_WHATSAPP);

  const messageBody = template(difusion);
  return messageBody;
}
