
import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/user/update-user.dto';
import { CreateUserDto } from './dto/user/create-user.dto';
import { ResponseUserDto } from './dto/user/response-user.dto';
import { User } from './entities/user-entity';
import { IUserrepository, IUsertransactionPrismarepository } from './repository/user-repository.interface';
import { PrismaTransactionManager, TOKENSORM } from 'src/common/types/type-orm';
import { CreateOrderDto } from './dto/order/create-order.dto';
import { ResponseOrderDto } from './dto/order/respose-order.dto';
import { Order } from './entities/order-entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @Inject(TOKENSORM.USER_SERVICE_REPOSITORY)
    private readonly userRepository: IUserrepository,
    @Inject(TOKENSORM.USER_TRANSACTION)
    private readonly userTransactionRepository: IUsertransactionPrismarepository
  ) { }
  /**
   * Crear usuario
   * @param createLuneDto
   * @returns boolean
   */
  async createUser(userDto: CreateUserDto): Promise<boolean> {
    const hasEmailandName = await this.userRepository.findUserByEmailAndName({ name: userDto.name, email: userDto.email });
    const hasEmailandNameFlag = new Set(hasEmailandName);
    if (hasEmailandNameFlag.size > 0) { return false; }
    userDto.password = await bcrypt.hash(userDto.password, 10);
    const user = await this.userRepository.createUser(userDto);
    if (user.id) { return true; }
    return false;
  }
  /**
   * Obtener lista de usuarios
   * @returns ResponseUserDto[]
   */
  async findusuarios(): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.findAllUsers();
    return this.adaptadorUser(users);
  }
  /**
   * Obtener usuario especifico
   * @param id identificador de usuario
   * @returns { CreateUserDto } 
   */
  async findUser(id: number): Promise<ResponseUserDto> {
    return await this.userRepository.findByIdUser(id);
  }
  /**
   * Actualiza datos de un usuario
   * @param id identificador unico del usuario
   * @param user datos a actualizar
   * @returns ResponseUserDto
   */
  async updateUser(id: number, user: UpdateUserDto): Promise<ResponseUserDto> {
    return await this.userRepository.updateUser(id, user).then(() => this.findUser(id));
  }
  async findUserByEmailAndName(name: string, email: string): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.findUserByEmailAndName({ name, email });
    return this.adaptadorUser(users);
  }
  async createUserWithOrder(userDto: CreateUserDto, orderDto: CreateOrderDto): Promise<ResponseOrderDto> {
    return await this.userTransactionRepository.execute(async (manager: PrismaTransactionManager) => {
      const user = await manager.user.create({ data: { ...userDto, birthdate: new Date(userDto.birthdate) } }) as unknown as User;

      if (user.id) {
        const order = await manager.order.create({
          data: {
            ...orderDto,
            authorId: user.id,
          }
        }) as unknown as Order;
        return order;
      }
      throw new Error('Error al crear el usuario');



    }
    );
  }
  private adaptadorUser(usuarios: User[]): ResponseUserDto[] {
    return usuarios.map((user: User) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      birthdate: new Date(user.birthdate),
      emailVerified: Boolean(user.emailVerified),
      estatus: user.estatus,
    }));


  }
}
