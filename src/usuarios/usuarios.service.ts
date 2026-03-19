/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { User } from './entities/user-entity';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { Order } from './entities/order-entity';

@Injectable()
export class UsuariosService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    @Inject('DATA_SOURCE') private dataSource: DataSource,
  ) { }
  usuarios: CreateUserDto[] = [];
  /**
   * Crear usuario
   * @param createLuneDto
   * @returns boolean
   */
  async createUser(userDto: CreateUserDto): Promise<boolean> {
    const exitEmail = await this.userRepository.findOne({ where: { email: userDto.email } });
    if (exitEmail) return false;
    await this.userRepository.save({
      email: userDto.email,
      name: userDto.name,
      birthdate: userDto.birthdate,
      emailVerified: userDto.emailVerified,
      estatus: userDto.estatus,
      password: userDto.password,
      updatedAt: new Date(),
    });
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
      .where("User.name like :name", { name : `%${name}%` })
      .orWhere("User.email like  :email", { email: `%${email}%` })
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
  async crearUsuarioConOrden({ user, order }: { user: CreateUserDto, order: CreateOrderDto }): Promise<CreateOrderDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction(); 
    try {
      const newUser = await queryRunner.manager.save(User, user);
      const newOrder = await queryRunner.manager.save(Order, { ...order, user: newUser });
      await queryRunner.commitTransaction();
      return newOrder;
    }
    catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    }
    finally {
      await queryRunner.release();
    }
  }
}
