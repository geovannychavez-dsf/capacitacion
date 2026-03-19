/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/user/update-user.dto';
import { CreateUserDto } from './dto/user/create-user.dto';
import { ResponseUserDto } from './dto/user/response-user.dto';
import { User } from './entities/user-entity';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { Order } from './entities/order-entity';
import { CreateOrderDto } from './dto/order/create-order.dto';
import { TOKENSORM } from 'src/common/types/token-orm';

@Injectable()
export class UsuariosService {
  constructor(
    @Inject(TOKENSORM.USER_REPOSITORY) private userRepository: Repository<User>,
    @Inject(TOKENSORM.DATA_SOURCE) private dataSource: DataSource,
  ) { }
  usuarios: CreateUserDto[] = [];
  /**
   * Crear usuario
   * @param createLuneDto
   * @returns boolean
   */
  async createUser(userDto: CreateUserDto): Promise<boolean> {
    const hasEmailUser = await this.userRepository.findOne({ where: { email: userDto.email } });
    if (hasEmailUser) return false;
    const user = await this.userRepository.save({
      email: userDto.email,
      name: userDto.name,
      birthdate: userDto.birthdate,
      emailVerified: userDto.emailVerified,
      estatus: userDto.estatus,
      password: userDto.password,
      updatedAt: new Date(),
    });
    if (user.id) return true;
    return false;
  }
  /**
   * Obtener lista de usuarios
   * @returns ResponseUserDto[]
   */
  async findusuarios(): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.find();
    return this.adaptadorUser(users);
  }
  /**
   * Obtener usuario especifico
   * @param id identificador de usuario
   * @returns CreateUserDto
   */
  async findUser(id: number): Promise<ResponseUserDto> {
    return await this.userRepository.findOne({
      select: {
        id: true,
        email: true,
        name: true,
        birthdate: true,
        emailVerified: true,
        estatus: true,
      }, where: { id }
    });
  }
  /**
   * Actualiza datos de un usuario
   * @param id identificador unico del usuario
   * @param user datos a actualizar
   * @returns CreateUserDto
   */
  async updateUser(id: number, user: UpdateUserDto): Promise<ResponseUserDto> {
    return await this.userRepository.update({ id }, user).then(() => this.findUser(id));
  }
  async findUserByEmailAndName(name: string, email: string): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.createQueryBuilder("User")
      .where("User.name like :name", { name: `%${name}%` })
      .orWhere("User.email like  :email", { email: `%${email}%` })
      .getMany()
    return this.adaptadorUser(users);
  }
  async createUserWithOrder({ user, order }: { user: CreateUserDto, order: CreateOrderDto }): Promise<CreateOrderDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newUser = await queryRunner.manager.save(User, { ...user, updatedAt: new Date() });
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
  private adaptadorUser(usuarios: User[]): ResponseUserDto[] {
    return usuarios.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      birthdate: new Date(user.birthdate),
      emailVerified: Boolean(user.emailVerified),
      estatus: user.estatus,
    }));

  }
}
