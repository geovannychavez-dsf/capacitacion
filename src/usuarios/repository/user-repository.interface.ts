import { EntityManager } from 'typeorm';
import { CreateOrderDto } from '../dto/order/create-order.dto';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { User } from '../entities/user-entity';

import { PrismaTransactionManager } from 'src/common/types/type-orm';
export interface IUserrepository {
  findAllUsers(): Promise<User[]>;
  findByIdUser(id: number): Promise<User>;
  createUser(data: CreateUserDto): Promise<User>;
  updateUser(id: number, data: UpdateUserDto): Promise<User>;
  findUserByEmailAndName({ name, email }: { name: string; email: string }): Promise<User[]>;
  createOrder(data: CreateOrderDto): Promise<CreateOrderDto>;
}

export interface IUsertransactionrepository {
  execute<T>(work: (manager: EntityManager) => Promise<T>): Promise<T>;
}


export interface IUsertransactionPrismarepository {
  execute<T>(work: (manager: PrismaTransactionManager) => Promise<T>): Promise<T>;
}
