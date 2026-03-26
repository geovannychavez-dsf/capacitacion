import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseAuthDto } from './dtos/response-auth.dto';
import { RequestAuthDto } from './dtos/request-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { postSwaggerDocs } from './decoradores/login-swagger-docs';
import { Response } from 'express';
import { JWT_CONFIG, ONE_DAY } from 'src/common/types/type-orm';
import { ConfigService } from '@nestjs/config';

@ApiTags('auth')
@Controller({
    path: 'auth',
})
export class AuthController {
    constructor(private readonly authService: AuthService,
        private readonly config: ConfigService
    ) { }
    @postSwaggerDocs()
    @Post('login')
    async login(@Body() { email, password }: RequestAuthDto, @Res({ passthrough: true }) res: Response): Promise<ResponseAuthDto> {


        const { token, refreshToken } = await this.authService.validateUser(email, password);
        res.cookie(JWT_CONFIG.REFRESH_NAME, refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: ONE_DAY,
        });
        return { token, refreshToken: this.config.get(JWT_CONFIG.REFRESH_EXPIRES_IN,) };
    }
}
