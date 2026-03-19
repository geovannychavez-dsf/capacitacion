import { Inject, Injectable } from '@nestjs/common';
import { IUserrepository } from '../user-repository.interface';
import { User } from 'src/usuarios/entities/user-entity';
import { CreateUserDto } from 'src/usuarios/dto/create-user.dto';
import { PrismaService } from 'src/config/prisma/prismaservice';

@Injectable()
export class UserRepository implements IUserrepository  {
    constructor(@Inject('USER_REPOSITORY') private readonly userRepository: PrismaService ) {}
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