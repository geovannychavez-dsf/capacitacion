import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseAuthDto } from './dtos/response-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from './interfaces/cookies-request.interface';
import { loginTokenDecorator, refresTokenDecorator } from './decorators';
import { AuthGuard } from '@nestjs/passport';
import { JWT_CONFIG } from 'src/common/types/type-orm';

@ApiTags('auth')
@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}


  @UseGuards(AuthGuard(JWT_CONFIG.PASSPOT_LOCAL))
  @loginTokenDecorator()
  @Post('login')  
  async login(@Request() req: RequestWithUser) {
    return this.authService.login(req.user);
  }
  @refresTokenDecorator()
  @Post('refresh')
  refreshToken(@Request() token: string): Promise<ResponseAuthDto> {
    return this.authService.refreshToken(token);
  }
}
