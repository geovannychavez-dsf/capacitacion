import { Injectable } from '@nestjs/common';
import { UpdateLuneDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class usuariosService {
  usuarios: CreateUserDto[] = [];
  /**
   * Crear usuario
   * @param createLuneDto
   * @returns boolean
   */
  createUser(createLuneDto: CreateUserDto): boolean {
    const ExitEmail = this.usuarios.find(
      (usuario) => usuario.email === createLuneDto.email,
    );
    if (ExitEmail) return false;
    this.usuarios.push({
      ...createLuneDto,
      id: this.usuarios.length + 1,
    });
    return true;
  }
  /**
   * Obtener lista de usuarios
   * @returns CreateUserDto[]
   */
  findusuarios(): CreateUserDto[] {
    return this.usuarios;
  }
  /**
   * Obtener usuario especifico
   * @param id identificador de usuario
   * @returns CreateUserDto
   */
  findUser(id: number): ResponseUserDto {
    return this.usuarios.find((usuario) => usuario.id == id);
  }
  /**
   * Actualiza datos de un usuario
   * @param id identificador unico del usuario
   * @param updateLuneDto datos a actualizar
   * @returns CreateUserDto
   */
  updateUser(id: number, updateLuneDto: UpdateLuneDto): CreateUserDto {
    const index = this.usuarios.findIndex((usuario) => usuario.id == id);
    this.usuarios[index] = { ...this.usuarios[index], ...updateLuneDto };
    return this.usuarios[index];
  }
}
