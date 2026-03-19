import { Inject, Injectable } from '@nestjs/common';
import { IUserrepository } from '../user-repository.interface';
import { User } from 'src/usuarios/entities/user-entity';
import { CreateUserDto } from 'src/usuarios/dto/user/create-user.dto';
import { Repository } from 'typeorm';
import { TOKENSORM } from 'src/common/types/token-orm';
import { CreateOrderDto } from 'src/usuarios/dto/order/create-order.dto';
import { Order } from 'src/usuarios/entities/order-entity';
import { UpdateUserDto } from 'src/usuarios/dto/user/update-user.dto';

@Injectable()
export class UserRepository implements IUserrepository {
  constructor(
    @Inject(TOKENSORM.USER_REPOSITORY) private readonly userRepository: Repository<User>,
    @Inject(TOKENSORM.ORDER_REPOSITORY) private readonly orderRepository: Repository<Order>,
  ) {}
  async createOrder(data: CreateOrderDto): Promise<CreateOrderDto> {
    return await this.orderRepository.save(data);
  }
  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async findByIdUser(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }
  async createUser(data: CreateUserDto): Promise<User> {
    return await this.userRepository.save(data);
  }
  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    return await this.userRepository.update({ id }, data).then(() => this.findByIdUser(id));
  }
  async findUserByEmailAndName({ name, email }: { name: string; email: string }): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('User')
      .where('User.name like :name', { name: `%${name}%` })
      .orWhere('User.email like  :email', { email: `%${email}%` })
      .getMany();
  }
}
