import { applyDecorators } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function exceptionSwaggerDecorator() {
  return applyDecorators(
    ApiUnauthorizedResponse({
      description: 'No tiene autorización',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 401 },
          message: {
            type: 'string',
            example: 'Credenciales incorrectas',
          },
          error: { type: 'string', example: 'Unauthorized' },
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'Error interno del servidor',
      schema: {
        example: {
          statusCode: 500,
          message: 'Hubo un error por favor intente mas tarde',
          error: 'Internal Server Error',
        },
      },
    }),
  );
}
