import { PassportStrategy } from '@nestjs/passport';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

import { Strategy } from 'passport-local';
import { ResponseUserDto } from 'src/modules/usuarios/dtos/user/response-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<ResponseUserDto> {
    try {
      const user = await this.authService.validateUser(email, password);
      if (!user) throw new UnauthorizedException();
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un error por favor intente mas tarde');
    }
  }
}
