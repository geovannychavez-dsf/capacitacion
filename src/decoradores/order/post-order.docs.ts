import { applyDecorators, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
export function PostOrderDocs() {
  return applyDecorators(
    UsePipes(new ValidationPipe()),
    ApiOperation({
      summary: 'Crear Orden',
      description: 'Este endpoint se encarga de la creación de la orden.',
    }),
    ApiBasicAuth(),
    ApiCreatedResponse({
      description: 'Orden creada correctamente',
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
            example: ['Formato de la descripción no es válido'],
          },
          error: { type: 'string', example: 'Bad Request' },
        },
      },
    }),
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
  );
}
