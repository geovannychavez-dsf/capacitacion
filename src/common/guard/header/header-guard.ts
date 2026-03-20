import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { PASSWORD_ADMIN, USERNAME_ADMIN } from 'src/common/types/type-orm';

@Injectable()
export class HeaderGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const headerGuard = context.switchToHttp().getRequest<Request>().headers;

    const authHeader = headerGuard['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('No autorizado');
    }

    const [type, credentials] = authHeader.split(' ');

    if (type === 'Basic' && credentials) {
      const decoded = Buffer.from(credentials, 'base64').toString('utf-8');
      const [username, password] = decoded.split(':');

      if (username === USERNAME_ADMIN && password === PASSWORD_ADMIN) {
        return true;
      }
    }

    throw new UnauthorizedException('Credenciales incorrectas');
  }
}
