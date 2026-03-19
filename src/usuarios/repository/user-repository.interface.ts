import { User } from 'generated/prisma/browser';
import { CreateUserDto } from '../dto/create-user.dto';
export interface IUserrepository {
  findAllUsers(): Promise<User[]>;
  findByIdUser(id: number): Promise<User>;
  createUser(data: CreateUserDto): Promise<User>;
  updateUser(id: number, data: any): Promise<User>;
}

export interface IUsertransactionrepository {
  runInTransaction<T>(work: () => Promise<T>): Promise<T>;
}
