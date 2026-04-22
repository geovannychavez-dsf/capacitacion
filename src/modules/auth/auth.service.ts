import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ENV,
  JWT_CONFIG,
  ONE_DAY,
  ONE_MINUTE,
  ONE_MONTH,
  TOKENSORM,
} from 'src/common/types/type-orm';
import { ResponseAuthDto } from './dtos/response-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Userrepository } from '../usuarios/interfaces/user-repository.interface';
import { ResponseUserDto } from '../usuarios/dtos/user';
import { Response } from 'express';
import { RequestWithCookies } from './interfaces/cookies-request.interface';
import { RefreshTokenRepository } from './repository/refresh-token.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(TOKENSORM.USER_SERVICE_REPOSITORY)
    private readonly userRepository: Userrepository,
    @Inject(TOKENSORM.REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<ResponseUserDto> {
    try {
      const user = await this.userRepository.findUserByEmail(email);
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException('Credenciales incorrectas');
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          birthdate: user.birthdate,
          emailVerified: user.emailVerified,
          estatus: user.estatus,
          rol: user.rol,
        };
      }

      throw new UnauthorizedException('Credenciales incorrectas');
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un error por favor intente mas tarde');
    }
  }

  async login(user: ResponseUserDto, res: Response): Promise<ResponseAuthDto> {
    const { email, id } = user;
    const { token, refreshToken } = await this.ganerateTokenandRefreshToken({ email, id });

    const expiresAt = new Date(Date.now() + ONE_DAY);
    await this.refreshTokenRepository.save(id, refreshToken, expiresAt);

    this.setCookies(res, token, refreshToken);
    return {
      user: {
        id,
        email,
        nombres: user.name,
        cedula: user.email,
        telefono: '',
        direccion: '',
        isFirstLogin: user.emailVerified,
        rol: user.rol,
      },
    };
  }

  async refreshToken(req: RequestWithCookies, res: Response): Promise<ResponseAuthDto> {
    try {
      const token = req.cookies?.refreshToken;
      if (!token) {
        throw new UnauthorizedException('Credenciales incorrectas');
      }

      const verifyrefreshtoken = await this.jwtService.verifyAsync<Record<string, unknown>>(token, {
        secret: this.config.get(JWT_CONFIG.REFRESH_SECRET),
      });

      if (!verifyrefreshtoken) {
        throw new UnauthorizedException('Credenciales incorrectas');
      }

      const stored = await this.refreshTokenRepository.findActive(token);
      if (!stored) {
        throw new UnauthorizedException('Sesión inválida o expirada');
      }
      const { email, usuario } = verifyrefreshtoken;
      const { token: newToken, refreshToken } = await this.ganerateTokenandRefreshToken({
        email: email as string,
        id: usuario as number,
      });
      await this.refreshTokenRepository.revokeByToken(token);
      const expiresAt = new Date(Date.now() + ONE_DAY);
      await this.refreshTokenRepository.save(usuario as number, refreshToken, expiresAt);
      this.setCookies(res, newToken, refreshToken);
      return { message: 'Token renovado' };
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un error por favor intente mas tarde');
    }
  }

  async me(userId: number) {
    try {
      const user = await this.userRepository.findByIdUser(userId);
      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }
      return user;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un error por favor intente mas tarde');
    }
  }

  async logout(req: RequestWithCookies, res: Response): Promise<string> {
    const token = req.cookies?.refreshToken;
    if (token) {
      await this.refreshTokenRepository.revokeByToken(token);
    }
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return 'Cierre de sesión exitoso';
  }

  private async ganerateTokenandRefreshToken(payloaduser: {
    id: number;
    email: string;
  }): Promise<{ token: string; refreshToken: string }> {
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
  private setCookies(res: Response, accessToken: string, refreshToken: string) {
    const isProduction = this.config.get<string>(ENV.NODE_ENV) === 'production';
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 15 * ONE_MINUTE,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: ONE_MONTH,
    });
  }
}
