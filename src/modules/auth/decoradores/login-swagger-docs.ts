import { applyDecorators, UsePipes, ValidationPipe } from '@nestjs/common';
import {  ApiInternalServerErrorResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';


export function postSwaggerDocs() {
    return applyDecorators(
        UsePipes(new ValidationPipe()),
        ApiOperation({
            summary: 'Login',
            description: 'Este endpoint realiza el login de un usuario',
        }),

        
        ApiUnauthorizedResponse({ description: 'Credenciales incorrectas' }),
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
