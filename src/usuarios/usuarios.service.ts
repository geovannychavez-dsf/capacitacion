/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { User } from './entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class usuariosService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) { }
  usuarios: CreateUserDto[] = [];
  /**
   * Crear usuario
   * @param createLuneDto
   * @returns boolean
   */
  async createUser(createLuneDto: CreateUserDto): Promise<boolean> {
    const ExitEmail = await this.userRepository.findOne({ where: { email: createLuneDto.email } });
    if (ExitEmail) return false;
    await this.userRepository.save(createLuneDto);
    return true;
  }
  /**
   * Obtener lista de usuarios
   * @returns ResponseUserDto[]
   */
  async findusuarios(): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.find();
    return users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      birthdate: new Date(user.birthdate),
      emailVerified: user.emailVerified,
      estatus: user.estatus,
    }));
  }
  /**
   * Obtener usuario especifico
   * @param id identificador de usuario
   * @returns CreateUserDto
   */
  async findUser(id: number): Promise<ResponseUserDto> {
    return await this.userRepository.findOne({ where: { id } });
  }
  /**
   * Actualiza datos de un usuario
   * @param id identificador unico del usuario
   * @param updateLuneDto datos a actualizar
   * @returns CreateUserDto
   */
  async updateUser(id: number, updateLuneDto: UpdateUserDto): Promise<ResponseUserDto> {
    return await this.userRepository.update({ id }, updateLuneDto).then(() => this.findUser(id));
  }
  async findUserByEmailAndName(name:string,email:string):Promise<ResponseUserDto[]>{
    const users = await this.userRepository.createQueryBuilder("User")
      .where("User.name like %:name", { name })
      .orWhere("User.email like  %:email", { email })
      .getMany()
    return users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      birthdate: new Date(user.birthdate),
      emailVerified: user.emailVerified,
      estatus: user.estatus,
    }));
  }
}
