import { applyDecorators, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ResponseCharactersDto } from '../dtos';

export function getCharacterDecorator({
  summary,
  description,
}: {
  summary: string;
  description: string;
}) {
  return applyDecorators(
    UsePipes(new ValidationPipe()),
    ApiOperation({
      summary: summary,
      description: description,
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: 'Personaje obtenido correctamente',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(ResponseCharactersDto) },
          },
          message: { type: 'string', example: 'Operacion exitosa' },
        },
      },
    }),
  );
}
