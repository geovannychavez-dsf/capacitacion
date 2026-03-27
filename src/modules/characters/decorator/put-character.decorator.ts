import { applyDecorators, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiParam, ApiUnauthorizedResponse, getSchemaPath } from "@nestjs/swagger";
import { ResponseCharactersDto, UpdatCharactersDto } from "../dtos";

export function putCharacterDecorator() {
    return applyDecorators(
        UsePipes(new ValidationPipe()),
        ApiOperation({ summary: 'Actualiza un personaje' }),
        ApiBearerAuth(),
        ApiBody({ type: UpdatCharactersDto }),
        ApiParam({ name: 'id', type: String }),
        ApiOkResponse({
            type: ResponseCharactersDto,
            description: 'Personaje actualizado correctamente',
            schema: {
                example: {
                    status: true,
                    data: {
                        $ref: getSchemaPath(ResponseCharactersDto),
                    },
                    message: 'Operacion exitosa',
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
                        example: 'Credenciales incorrectas ',
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
                    message: 'Error interno del servidor',
                    error: 'Internal Server Error',
                },
            },
        }),
    );
}

