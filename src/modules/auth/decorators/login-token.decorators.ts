import { applyDecorators, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiExtraModels, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiSecurity, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ResponseAuthDto } from '../dtos/response-auth.dto';
import { RequestAuthDto } from '../dtos/request-auth.dto';


export function loginTokenDecorator() {
    return applyDecorators(
        UsePipes(new ValidationPipe()),
        ApiExtraModels(ResponseAuthDto, RequestAuthDto),
        ApiSecurity('none'),
        ApiOperation({
            summary: 'Login users endpoint',
            description: 'Este endpoint realiza el login de un usuario',
        }),
        ApiBody({ type: RequestAuthDto }),
        ApiOkResponse({
            description: 'Login exitoso',
            schema: {
                type: 'object',
                properties: {
                    token: { type: 'string', example: 'eyJhR5cCI6IkpXVCJ9...' },
                    refreshToken: { type: 'string', example: '1d' }
                },
            }
        }),
        ApiUnauthorizedResponse({
            description: 'Credenciales incorrectas',
            schema: {
                example: {
                    statusCode: 401,
                    message: 'Credenciales incorrectas',
                },
            }
        }),

        ApiInternalServerErrorResponse({
            description: 'Error interno del servidor',
            schema: {
                example: {
                    statusCode: 500,
                    message: 'Error interno del servidor',
                },
            },
        }),
    );
}
