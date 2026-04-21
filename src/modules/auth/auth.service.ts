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
import { Response } from 'express';
import { RequestWithCookies } from './interfaces/cookies-request.interface';

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
        return { id: user.id, email: user.email, name: user.name , birthdate: user.birthdate, emailVerified: user.emailVerified, estatus: user.estatus, rol: user.rol };

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
    const tokens = await this.ganerateTokenandRefreshToken({ email, id });

    this.setCookies(res, tokens.token, tokens.refreshToken);
    return {  ...tokens, user: { id, email, nombres: user.name, cedula: user.email, telefono: '', direccion: '', isFirstLogin: user.emailVerified, rol:user.rol} };
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
      if (verifyrefreshtoken) {
        const { email, usuario } = verifyrefreshtoken;
        const refresToken = await this.ganerateTokenandRefreshToken({
          email: email as string,
          id: usuario as number,
        });
        this.setCookies(res, refresToken.token, refresToken.refreshToken);
        return refresToken;
      }

      throw new UnauthorizedException('Credenciales incorrectas');
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un error por favor intente mas tarde');
    }
  }
  logout(res: Response): string {    
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return 'Cierre de sesión exitoso';
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

  private setCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false, // true en producción (HTTPS)
      sameSite: 'strict',
      maxAge: 3600000, // 1 hora
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 86400000, // 1 día
    });
  }
}
