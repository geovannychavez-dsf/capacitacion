import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JWT_CONFIG } from 'src/common/types/type-orm';
@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.cookies?.accessToken as string,
        ExtractJwt.fromAuthHeaderAsBearerToken(), 
      ]),
      secretOrKey: config.get(JWT_CONFIG.SECRET),
    });
  }

  validate({ usuario, email }: { usuario: number; email: string }) {
    return { id: usuario, email: email };
  }
}
