import { applyDecorators, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { CreateDifusionDto } from '../dtos';
export function postDifusoDecorator() {
  return applyDecorators(
    UsePipes(new ValidationPipe()),
    ApiOperation({ summary: 'Crea una difusion' }),
    ApiBearerAuth(),
    ApiBody({ type: CreateDifusionDto }),
    ApiCreatedResponse({
      type: CreateDifusionDto,
      description: 'Difusion creada correctamente',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'boolean', example: true },
          data: {
            type: 'object',
            $ref: getSchemaPath(CreateDifusionDto),
          },
          message: { type: 'string', example: 'Operacion exitosa' },
        },
      },
    }),
  );
}
