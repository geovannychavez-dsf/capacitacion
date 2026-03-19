import { Inject, Injectable } from '@nestjs/common';
import { IUserrepository } from '../user-repository.interface';
import { User } from 'src/usuarios/entities/user-entity';
import { CreateUserDto } from 'src/usuarios/dto/user/create-user.dto';
import { PrismaService } from 'src/config/prisma/prismaservice';
import { CreateOrderDto } from 'src/usuarios/dto/order/create-order.dto';

@Injectable()
export class UserRepository implements IUserrepository {
  constructor(@Inject('USER_REPOSITORY') private readonly userRepository: PrismaService) {}
  findUserByEmailAndName({ name, email }: { name: string; email: string; }): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  createOrder(data: CreateOrderDto): Promise<CreateOrderDto> {
    throw new Error('Method not implemented.');
  }
  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.users.find();
  }
  async findByIdUser(id: number): Promise<User> {
    return await this.userRepository.user.findOne({ where: { id } });
  }
  async createUser(data: CreateUserDto): Promise<User> {
    return await this.userRepository.user.save(data);
  }
  async updateUser(id: number, data: any): Promise<User> {
    return await this.userRepository.user.update({ id }, data).then(() => this.findByIdUser(id));
  }
}
