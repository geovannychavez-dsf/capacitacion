
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Strategy,ExtractJwt } from 'passport-jwt';



@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

   validate({ usuario, email }: { usuario: number; email: string }) {
        return { id: usuario, email: email };
    }
}
