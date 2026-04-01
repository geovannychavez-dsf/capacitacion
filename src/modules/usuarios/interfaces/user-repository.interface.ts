import { EntityManager } from 'typeorm';
import { User } from '../entity/user-model.entity';

import { PrismaTransactionManager } from 'src/common/types/type-orm';
import { CreateUserDto, UpdateUserDto } from '../dtos/user';
import { CreateOrderDto } from '../dtos/order/create-order.dto';
export interface Userrepository {
  findAllUsers(): Promise<User[]>;
  findByIdUser(id: number): Promise<User>;
  createUser(data: CreateUserDto): Promise<User>;
  updateUser(id: number, data: UpdateUserDto): Promise<User>;
  findUserByEmailAndName({ name, email }: { name: string; email: string }): Promise<User[]>;
  createOrder(data: CreateOrderDto): Promise<CreateOrderDto>;
  findUserByEmail(email: string): Promise<User>;
}

export interface Usertransactionrepository {
  execute<T>(work: (manager: EntityManager) => Promise<T>): Promise<T>;
}

export interface UsertransactionPrismarepository {
  execute<T>(work: (manager: PrismaTransactionManager) => Promise<T>): Promise<T>;
}
