import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseAuthDto } from './dtos/response-auth.dto';
import { RequestAuthDto } from './dtos/request-auth.dto';
import { ApiOkResponse, ApiOperation, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { postSwaggerDocs } from './decoradores/login-swagger-docs';

@ApiTags('auth')
@Controller({
    path: 'auth',
})
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @postSwaggerDocs()
    @ApiOkResponse({
        description: 'Login exitoso',
        schema: {
            type: 'object',
            properties: {
                data: {
                    $ref: getSchemaPath(ResponseAuthDto),
                }
            },
        }
    })
    @ApiOperation({
        summary: 'Login de usuario',
        description: 'Este endpoint Muestra uns lista de todos los usuarios.',
    })
    @Post()
    async login(@Body() requestAuthDto: RequestAuthDto): Promise<ResponseAuthDto> {
        return await this.authService.validateUser(requestAuthDto.email, requestAuthDto.password);
    }
}
