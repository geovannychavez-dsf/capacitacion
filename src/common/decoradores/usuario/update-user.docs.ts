import { applyDecorators, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { HeaderGuard } from 'src/common/guard/header/header-guard';
import { CreateUserDto } from 'src/usuarios/dto/user/create-user.dto';
export function updateUserDocs() {
  return applyDecorators(
    UseGuards(HeaderGuard),
    ApiOperation({
      summary: 'Actualiza Usuario',
      description: 'Este endpoint Actualiza un usuario en especifico por id.',
    }),
    UsePipes(new ValidationPipe()),
    ApiBasicAuth(),
    ApiParam({
      name: 'id',
      type: String,
    }),
    ApiOkResponse({
      description: 'Usuario Actualizado',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          data: {
            $ref: getSchemaPath(CreateUserDto),
          },
          message: { type: 'string', example: 'Operacion exitosa' },
        },
      },
    }),
    ApiBody({ type: CreateUserDto }),
    ApiBadRequestResponse({
      description: 'Error de validación en el body',
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
