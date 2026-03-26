import { Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JWT_CONFIG, TOKENSORM } from 'src/common/types/type-orm';
import { IUserrepository } from 'src/usuarios/repository/user-repository.interface';
import { ResponseAuthDto } from './dtos/response-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(TOKENSORM.USER_SERVICE_REPOSITORY)
    private readonly userRepository: IUserrepository,
    private jwtService: JwtService,
    private readonly config: ConfigService
  ) { }

  async validateUser(email: string, password: string): Promise<ResponseAuthDto> {

    try {
      const user = await this.userRepository.findUserByEmailAndName({ name: '', email });

      if (user.length > 0) {
        const verificar = await bcrypt.compare(password, user[0].password);
        if (verificar) {
          const urserpayload = { usuario: user[0].id, email: user[0].email };

          const { token, refreshToken } = await this.ganerateTokenandRefreshToken(urserpayload);
          return { token, refreshToken };
        }
        throw new UnauthorizedException('Credenciales incorrectas');
      }
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    catch (error: unknown) {
      console.log(error);
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Credenciales incorrectas');
      }
      throw new InternalServerErrorException('Hubo un error por favor intente mas tarde');
    }
  }

  async refreshToken(token: string): Promise<ResponseAuthDto> {
    try {
      const verifyrefreshtoken = await this.jwtService.verifyAsync<Record<string, unknown>>(token, { secret: this.config.get(JWT_CONFIG.REFRESH_SECRET) });
      if (verifyrefreshtoken) return { token: await this.jwtService.signAsync(verifyrefreshtoken), refreshToken: token };

      throw new UnauthorizedException('Credenciales incorrectas');

    } catch (error: unknown) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Credenciales incorrectas');
      }
      throw new InternalServerErrorException('Hubo un error por favor intente mas tarde');
    }

  }
  private async ganerateTokenandRefreshToken(payload: { usuario: number, email: string }): Promise<ResponseAuthDto> {
    const [token, refreshToken] = await Promise.all(
      [
        this.jwtService.signAsync(payload),
        this.jwtService.signAsync(payload, {
          secret: this.config.get(JWT_CONFIG.REFRESH_SECRET),
          expiresIn: this.config.get(JWT_CONFIG.REFRESH_EXPIRES_IN,)
        })
      ]
    );
    return { token, refreshToken };
  }
}
