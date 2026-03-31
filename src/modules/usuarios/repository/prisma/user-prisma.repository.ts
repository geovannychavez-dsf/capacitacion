import { Injectable } from '@nestjs/common';
import { Userrepository } from '../../interfaces/user-repository.interface';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { User } from '../../entities/user-model.entity';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { UpdateUserDto } from '../../dto/user/update-user.dto';
import { CreateOrderDto } from '../../dto/order/create-order.dto';

@Injectable()
export class UserRepository implements Userrepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllUsers(): Promise<User[]> {
    return (await this.prisma.user.findMany()) as unknown as User[];
  }

  async findByIdUser(id: number): Promise<User> {
    return (await this.prisma.user.findUnique({ where: { id } })) as unknown as Promise<User>;
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return (await this.prisma.user.create({
      data: { ...user, birthdate: new Date(user.birthdate) },
    })) as User;
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<User> {
    return (await this.prisma.user.update({
      where: { id },
      data: { ...user, birthdate: new Date(user.birthdate) },
    })) as unknown as User;
  }

  async findUserByEmailAndName({ name, email }: { name: string; email: string }): Promise<User[]> {
    return (await this.prisma.user.findMany({
      where: {
        OR: [{ name: { equals: name } }, { email: { equals: email } }],
      },
    })) as unknown as User[];
  }

  async createOrder(user: CreateOrderDto): Promise<CreateOrderDto> {
    return (await this.prisma.order.create({ data: { ...user } })) as unknown as CreateOrderDto;
  }
}
