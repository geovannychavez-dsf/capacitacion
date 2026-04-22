import { EntityManager } from 'typeorm';
import { User } from '../entity/user-model.entity';

import { CreateUserDto, UpdateUserDto } from '../dtos/user';
import { CreateOrderDto } from '../dtos/order/create-order.dto';
export interface Userrepository {
  findAllUsers(): Promise<User[]>;
  findByIdUser(id: number): Promise<User | null>;
  createUser(data: CreateUserDto): Promise<User>;
  updateUser(id: number, data: UpdateUserDto): Promise<User | null>;
  findUserByEmailAndName({ name, email }: { name: string; email: string }): Promise<User[]>;
  createOrder(data: CreateOrderDto): Promise<CreateOrderDto>;
  findUserByEmail(email: string): Promise<User | null>;
}

export interface Usertransactionrepository {
  execute<T>(work: (manager: EntityManager) => Promise<T>): Promise<T>;
}
