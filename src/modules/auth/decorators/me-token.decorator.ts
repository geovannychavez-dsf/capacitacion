import { applyDecorators } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JWT_CONFIG } from 'src/common/types/type-orm';

export function meTokenDecorator() {
  return applyDecorators(
    ApiCookieAuth(JWT_CONFIG.REFRESH_NAME),
    ApiOperation({
      summary: 'Obtener usuario autenticado',
      description: 'Retorna los datos del usuario dueño del accessToken en cookie',
    }),
    ApiOkResponse({
      description: 'Usuario autenticado',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          email: { type: 'string', example: 'user@example.com' },
          nombres: { type: 'string', example: 'Pedro Lopez' },
          rol: { type: 'string', example: 'paciente' },
          isFirstLogin: { type: 'boolean', example: true },
          estatus: { type: 'string', example: 'activo' },
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: 'Token no encontrado o inválido',
      schema: { example: { statusCode: 401, message: 'Token no encontrado' } },
    }),
    ApiInternalServerErrorResponse({
      description: 'Error interno del servidor',
      schema: { example: { statusCode: 500, message: 'Error interno del servidor' } },
    }),
  );
}
