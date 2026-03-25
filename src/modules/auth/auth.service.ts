import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { TOKENSORM } from 'src/common/types/type-orm';
import { IUserrepository } from 'src/usuarios/repository/user-repository.interface';
import { ResponseAuthDto } from './dtos/response-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(TOKENSORM.USER_SERVICE_REPOSITORY)
    private readonly userRepository: IUserrepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<ResponseAuthDto> {
    const user = await this.userRepository.findUserByEmailAndName({ name: '', email });
    if (user.length > 0) {
      const verificar = await bcrypt.compare(password, user[0].password);
      if (verificar) {
        const responseAuthDto = new ResponseAuthDto();
        const token = { usuario: user[0].id, email: user[0].email };
        responseAuthDto.token = await this.jwtService.signAsync(token);
        return responseAuthDto;
      }
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    throw new UnauthorizedException('Credenciales incorrectas');
  }
}
