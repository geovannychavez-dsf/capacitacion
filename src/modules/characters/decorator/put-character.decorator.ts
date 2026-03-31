import { applyDecorators, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponseCharactersDto, UpdatCharactersDto } from '../dtos';

export function putCharacterDecorator() {
  return applyDecorators(
    UsePipes(new ValidationPipe()),
    ApiOperation({
      summary: 'Actualiza un personaje',
      description: 'Este endpoint Actualiza un personaje en especifico por id.',
    }),
    ApiBearerAuth(),
    ApiParam({ name: 'id', type: String }),
    ApiBody({ type: UpdatCharactersDto }),
    ApiOkResponse({
      description: 'Personaje actualizado correctamente',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          data: {
            $ref: getSchemaPath(ResponseCharactersDto),
          },
          message: { type: 'string', example: 'Operacion exitosa' },
        },
      },
    }),
  );
}
