import { applyDecorators, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
export function GetUserDocs() {
  return applyDecorators(
    UsePipes(new ValidationPipe()),
    ApiBasicAuth(),
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
    ApiNotFoundResponse({
      description: 'No se encontró ningún registro.',
      schema: {
        example: {
          statusCode: 404,
          message: 'Usuario no encontrado',
          error: 'Not Found',
        },
      },
    }),
  );
}
