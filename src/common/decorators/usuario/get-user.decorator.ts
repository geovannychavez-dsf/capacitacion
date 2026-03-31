import { applyDecorators, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
export function getUserDocs() {
  return applyDecorators(
    UsePipes(new ValidationPipe()),
    ApiBearerAuth(),
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
    })
  );
}
