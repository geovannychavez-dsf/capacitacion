import { applyDecorators, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  getSchemaPath,
} from '@nestjs/swagger';
import { HeaderGuard } from 'src/common/guard/header/authorication-header.guard';
import { CreateUserDto } from 'src/modules/usuarios/dtos/user';
export function updateUserDocs() {
  return applyDecorators(
    UseGuards(HeaderGuard),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Actualiza Usuario',
      description: 'Este endpoint Actualiza un usuario en especifico por id.',
    }),
    UsePipes(new ValidationPipe()),
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
  );
}
