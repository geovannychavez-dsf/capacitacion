import { Inject, Injectable } from '@nestjs/common';
import { IUserrepository } from '../user-repository.interface';
import { User } from 'src/usuarios/entities/user-entity';
import { CreateUserDto } from 'src/usuarios/dto/user/create-user.dto';
import { CreateOrderDto } from 'src/usuarios/dto/order/create-order.dto';
import { UpdateUserDto } from 'src/usuarios/dto/user/update-user.dto';
import { TOKENSORM } from 'src/common/types/token-orm';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class UserRepository implements IUserrepository {
  constructor(@Inject(TOKENSORM.USER_REPOSITORY) private readonly prisma: PrismaClient) { }
  async findAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        estatus: true,
        password: true,
        birthdate: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users;
  }
  async findByIdUser(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        estatus: true,
        password: false,
        birthdate: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  }
  async createUser(data: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data,
    });
  }
  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    const hasUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (hasUser) return this.prisma.user.update(hasUser.id, { data });
  }
  findUserByEmailAndName({ name, email }: { name: string; email: string }): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        OR: [
          {
            email: {
              contains: email
            },
          },
          {
            name: {
              contains: name
            },
          },
        ],
      },
    });
  }
  createOrder(data: CreateOrderDto): Promise<CreateOrderDto> {
    return this.prisma.order.create({
      data,
    });
  }
}
