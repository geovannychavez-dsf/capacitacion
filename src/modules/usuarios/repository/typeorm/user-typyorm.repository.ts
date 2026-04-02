import { Injectable } from '@nestjs/common';
import { Userrepository } from '../../interfaces/user-repository.interface';
import { Repository, DataSource } from 'typeorm';
import { User } from '../../entity/user-model.entity';
import { Order } from '../../entity/order-model.entity';
import { CreateUserDto, UpdateUserDto } from '../../dtos/user';
import { CreateOrderDto } from '../../dtos/order/create-order.dto';

@Injectable()
export class UserRepository implements Userrepository {
  constructor(
    private readonly userRepository: Repository<User>,
    private readonly orderRepository: Repository<Order>,
    private readonly dataSource: DataSource,
  ) {}
  async execute<T>(work: () => Promise<T>): Promise<T> {
    return this.dataSource.transaction(async () => {
      return await work();
    });
  }

  async createOrder(user: CreateOrderDto): Promise<CreateOrderDto> {
    return await this.orderRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findByIdUser(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return await this.userRepository.save(user);
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<User | null> {
    return await this.userRepository.update({ id }, user).then(() =>
      this.userRepository.findOne({
        where: { id },
      }),
    );
  }

  async findUserByEmailAndName({ name, email }: { name: string; email: string }): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('User')
      .where('User.name like :name', { name: `%${name}%` })
      .orWhere('User.email like :email', { email: `%${email}%` })
      .getMany();
  }
  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
