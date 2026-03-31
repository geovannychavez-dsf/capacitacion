import { applyDecorators, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { CreateCharactersDto, ResponseCharactersDto } from '../dtos';

export function postCharcterDecorator() {
  return applyDecorators(
    UsePipes(new ValidationPipe()),
    ApiOperation({ summary: 'Crea un personaje' }),
    ApiBearerAuth(),
    ApiBody({ type: CreateCharactersDto }),
    ApiCreatedResponse({
      type: ResponseCharactersDto,
      description: 'Personaje creado correctamente',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          data: {
            type: 'object',
            $ref: getSchemaPath(ResponseCharactersDto),
          },
          message: { type: 'string', example: 'Operacion exitosa' },
        },
      },
    }),
  );
}
