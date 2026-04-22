import { ResponseUserDto } from '../dtos/user';
import { User } from '../entity/user-model.entity';

export function adaptadorUser(usuarios: User[]): ResponseUserDto[] {
  return usuarios.map((user: User) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    birthdate: new Date(user.birthdate),
    emailVerified: Boolean(user.emailVerified),
    estatus: user.estatus,
    rol: user.rol,
  }));
}
