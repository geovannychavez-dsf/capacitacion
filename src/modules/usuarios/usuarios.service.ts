import {
  Inject,
  Injectable,
  InternalServerErrorException,
  HttpException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entity/user-model.entity';
import { Userrepository, Usertransactionrepository } from './interfaces/user-repository.interface';
import { TOKENSORM } from 'src/common/types/type-orm';
import { Order } from './entity/order-model.entity';
import * as bcrypt from 'bcrypt';
import { EntityManager } from 'typeorm';
import { CreateUserDto, ResponseUserDto, UpdateUserDto } from './dtos/user';
import { CreateOrderDto } from './dtos/order/create-order.dto';
import { ResponseOrderDto } from './dtos/order/respose-order.dto';
import { adaptadorUser } from './adapter/user-map.adapter';

@Injectable()
export class UsuariosService {
  constructor(
    @Inject(TOKENSORM.USER_SERVICE_REPOSITORY)
    private readonly userRepository: Userrepository,
    @Inject(TOKENSORM.USER_TRANSACTION)
    private readonly userTransactionRepository: Usertransactionrepository,
  ) {}
  /**
   * Crear usuario
   * @param createLuneDto
   * @returns boolean
   */
  async createUser(userDto: CreateUserDto): Promise<boolean> {
    try {
      const hasEmailandName = await this.userRepository.findUserByEmailAndName({
        name: userDto.name,
        email: userDto.email,
      });
      const hasEmailandNameFlag = new Set(hasEmailandName);
      if (hasEmailandNameFlag.size > 0) {
        throw new BadRequestException('Usuario con el mismo email o nombre ya registrado');
      }

      userDto.password = await bcrypt.hash(userDto.password, 10);
      const user = await this.userRepository.createUser(userDto);
      if (user.id) {
        return true;
      }
      throw new BadRequestException('Error al crear el usuario');
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un error por favor intente mas tarde');
    }
  }
  /**
   * Obtener lista de usuarios
   * @returns ResponseUserDto[]
   */
  async findusuarios(): Promise<ResponseUserDto[]> {
    try {
      const users = await this.userRepository.findAllUsers();
      if (users.length === 0) throw new NotFoundException('No se encontraron usuarios');
      return adaptadorUser(users);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un error por favor intente mas tarde');
    }
  }
  /**
   * Obtener usuario especifico
   * @param id identificador de usuario
   * @returns { CreateUserDto }
   */
  async findUser(id: number): Promise<ResponseUserDto> {
    try {
      const user = await this.userRepository.findByIdUser(id);
      if (!user) throw new NotFoundException('Usuario no encontrado');
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un error por favor intente mas tarde');
    }
  }
  /**
   * Actualiza datos de un usuario
   * @param id identificador unico del usuario
   * @param user datos a actualizar
   * @returns ResponseUserDto
   */
  async updateUser(id: number, user: UpdateUserDto): Promise<ResponseUserDto> {
    try {
      const userId = await this.userRepository.findByIdUser(id);
      if (userId) {
        return await this.userRepository.updateUser(id, user) as ResponseUserDto;
      }
      throw new NotFoundException('Usuario no encontrado');
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un error por favor intente mas tarde');
    }
  }
  async findUserByEmailAndName(name: string, email: string): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.findUserByEmailAndName({ name, email });
    return adaptadorUser(users);
  }
  async createUserWithOrder(
    userDto: CreateUserDto,
    orderDto: CreateOrderDto,
  ): Promise<ResponseOrderDto> {
    try {
      const { order } = await this.userTransactionRepository.execute(
        async (manager: EntityManager) => {
          const user = await manager.save(User, userDto);
          if (user) {
            const order = await manager.save(Order, { user: user, ...orderDto });
            return { order, user };
          }
          throw new BadRequestException('Error al crear el usuario');
        },
      );
      return order;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un error por favor intente mas tarde');
    }
  }
}
