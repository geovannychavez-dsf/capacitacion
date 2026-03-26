import { applyDecorators, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, getSchemaPath } from "@nestjs/swagger";
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
        })
    );
}

