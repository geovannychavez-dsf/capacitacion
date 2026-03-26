import { applyDecorators, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, getSchemaPath } from "@nestjs/swagger";
import {  ResponseCharactersDto } from "../dtos";

export function postCharcterDecorator() {
    return (
        applyDecorators(
            UsePipes(new ValidationPipe()),
            ApiOperation({ summary: 'Crea un personaje' }),
            ApiBearerAuth(),
            ApiBody({ type: ResponseCharactersDto }),
            ApiCreatedResponse({
                type: ResponseCharactersDto,
                description: 'Personaje creado correctamente',
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
        )
    )
}