import { Controller, Post, UseGuards, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseAuthDto } from './dtos/response-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { RequestWithUser, RequestWithCookies } from './interfaces/cookies-request.interface';
import { loginTokenDecorator, refresTokenDecorator } from './decorators';
import { AuthGuard } from '@nestjs/passport';
import { JWT_CONFIG } from 'src/common/types/type-orm';
import { Response } from 'express';

@ApiTags('auth')
@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard(JWT_CONFIG.PASSPOT_LOCAL))
  @loginTokenDecorator()
  @Post('login')
  login(@Request() req: RequestWithUser, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(req.user, res);
  }
  @refresTokenDecorator()
  @Post('refresh')
  refreshToken(@Request() req: RequestWithCookies, @Res({ passthrough: true }) res: Response): Promise<ResponseAuthDto> {
    return this.authService.refreshToken(req, res);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
