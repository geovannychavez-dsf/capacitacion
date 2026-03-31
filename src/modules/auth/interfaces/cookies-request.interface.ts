import { ResponseUserDto } from 'src/modules/usuarios/dto/user/response-user.dto';
import { Request } from '@nestjs/common';
export interface CookieMap {
  [key: string]: string;
}

export interface RequestWithUser extends Request {
  user: ResponseUserDto;
}
