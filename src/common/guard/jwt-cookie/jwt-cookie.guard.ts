import {  ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JWT_CONFIG } from 'src/common/types/type-orm';

@Injectable()
export class JwtCookieGuard extends AuthGuard(JWT_CONFIG.PASSPOT_JWT) {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies?.accessToken as string | undefined;

    if (!token) {
      throw new UnauthorizedException('Token no encontrado');
    }
    
    request.headers.authorization = `Bearer ${token}`;
    return super.canActivate(context);
  }
}
