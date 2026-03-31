import { applyDecorators, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation
} from '@nestjs/swagger';
export function postUserDocs() {
  return applyDecorators(
    UsePipes(new ValidationPipe()),
    ApiOperation({
      summary: 'Crear Usuario',
      description: 'Este endpoint se encarga de la creación del usuario.',
    }),
    ApiBearerAuth(),
    ApiCreatedResponse({
      description: 'Usuario creado correctamente',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          data: {
            type: 'boolean',
            example: true,
          },
          message: { type: 'string', example: 'Operacion exitosa' },
        },
      },
    }),
     ApiBadRequestResponse({
          description: 'Error de validación en el cuerpo de la petición',
          schema: {
            type: 'object',
            properties: {
              statusCode: { type: 'number', example: 400 },
              message: {
                type: 'array',
                example: ['El formato del correo electrónico no es válido'],
              },
              error: { type: 'string', example: 'Bad Request' },
            },
          },
        }),
  );
}
