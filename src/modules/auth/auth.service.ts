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
import { IUserrepository } from '../usuarios/interfaces/user-repository.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(TOKENSORM.USER_SERVICE_REPOSITORY)
    private readonly userRepository: IUserrepository,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<ResponseAuthDto> {
    try {
      const user = await this.userRepository.findUserByEmailAndName({ name: '', email });
      if (user.length > 0) {
        const { token, refreshToken } = await this.ganerateTokenandRefreshToken({
          usuario: user[0].id,
          email: user[0].email,
          password,
          passworcompare: user[0].password,
        });
        return { token, refreshToken };
      }

      throw new UnauthorizedException('Credenciales incorrectas');
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un error por favor intente mas tarde');
    }
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
    usuario: number;
    email: string;
    password: string;
    passworcompare: string;
  }): Promise<ResponseAuthDto> {
    const verificar = await bcrypt.compare(payloaduser.password, payloaduser.passworcompare);
    if (verificar) {
      const payload = { usuario: payloaduser.usuario, email: payloaduser.email };
      const [token, refreshToken] = await Promise.all([
        this.jwtService.signAsync(payload),
        this.jwtService.signAsync(payload, {
          secret: this.config.get(JWT_CONFIG.REFRESH_SECRET),
          expiresIn: this.config.get(JWT_CONFIG.REFRESH_EXPIRES_IN),
        }),
      ]);
      return { token, refreshToken };
    }
    throw new UnauthorizedException('Credenciales incorrectas');
  }
}
