import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JWT_CONFIG, TOKENSORM } from 'src/common/types/type-orm';
import { ResponseAuthDto } from './dtos/response-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Userrepository } from '../usuarios/interfaces/user-repository.interface';
import { ResponseUserDto } from '../usuarios/dtos/user';

@Injectable()
export class AuthService {
  constructor(
    @Inject(TOKENSORM.USER_SERVICE_REPOSITORY)
    private readonly userRepository: Userrepository,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<ResponseUserDto> {
    try {
      const user = await this.userRepository.findUserByEmail(email);
      if (user) {
        await bcrypt.compare(password, user.password);
        return { password: '', ...user };
      }

      throw new UnauthorizedException('Credenciales incorrectas');
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un error por favor intente mas tarde');
    }
  }

  async login({ email, id }: { email: string; id: number }): Promise<ResponseAuthDto> {
    return await this.ganerateTokenandRefreshToken({ email, id });
  }

  async refreshToken(token: string): Promise<ResponseAuthDto> {
    try {
      const verifyrefreshtoken = await this.jwtService.verifyAsync<Record<string, unknown>>(token, {
        secret: this.config.get(JWT_CONFIG.REFRESH_SECRET),
      });
      if (verifyrefreshtoken)
        return {
          token: await this.jwtService.signAsync({
            email: verifyrefreshtoken.email,
            usuario: verifyrefreshtoken.usuario,
          }),
          refreshToken: token,
        };

      throw new UnauthorizedException('Credenciales incorrectas');
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un error por favor intente mas tarde');
    }
  }
  private async ganerateTokenandRefreshToken(payloaduser: {
    id: number;
    email: string;
  }): Promise<ResponseAuthDto> {
    const payload = { usuario: payloaduser.id, email: payloaduser.email };
    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.config.get(JWT_CONFIG.REFRESH_SECRET),
        expiresIn: this.config.get(JWT_CONFIG.REFRESH_EXPIRES_IN),
      }),
    ]);
    return { token, refreshToken };
  }
}
