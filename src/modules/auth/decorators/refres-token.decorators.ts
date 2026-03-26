import { applyDecorators, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiCookieAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { JWT_CONFIG } from "src/common/types/type-orm";

export function refresTokenDecorator() {
    return applyDecorators(
        UsePipes(new ValidationPipe()),
        ApiOperation({ summary: 'Refresca el access token usando el refresh token en cookie' }),
        ApiResponse({ status: 200, description: 'Devuelve un nuevo access token' }),
        ApiCookieAuth(JWT_CONFIG.REFRESH_NAME),
        ApiOkResponse({
            description: 'Login exitoso',
            schema: {
                type: 'object',
                properties: {
                    token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
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
                    error: 'Unauthorized',
                },
            }
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