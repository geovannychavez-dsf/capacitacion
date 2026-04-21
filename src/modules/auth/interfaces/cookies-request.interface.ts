import { Request } from 'express';
import { ResponseUserDto } from 'src/modules/usuarios/dtos/user';

export interface CookieMap {
  [key: string]: string;
}

export interface RequestWithUser extends Request {
  user: ResponseUserDto;
}

export interface RequestWithCookies extends Request {
  cookies: CookieMap;
}
