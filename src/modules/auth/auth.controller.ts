import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseAuthDto } from './dtos/response-auth.dto';
import { RequestAuthDto } from './dtos/request-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { JWT_CONFIG, ONE_DAY } from 'src/common/types/type-orm';
import { ConfigService } from '@nestjs/config';
import { CookieMap } from './interfaces/cookies-interfaces';
import { loginTokenDecorator, refresTokenDecorator } from './decorators';

@ApiTags('auth')
@Controller({
    path: 'auth',
})
export class AuthController {
    constructor(private readonly authService: AuthService,
        private readonly config: ConfigService
    ) { }
    @loginTokenDecorator()
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
    @refresTokenDecorator()
    @Post('refresh')
    async refreshToken(@Res({ passthrough: true }) req: Request): Promise<ResponseAuthDto> {
        console.log(req.cookies);
        const refreshToken = (req.cookies as CookieMap)[JWT_CONFIG.REFRESH_NAME]
        return await this.authService.refreshToken(refreshToken);
    }
}
