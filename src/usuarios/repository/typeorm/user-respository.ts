import { Inject, Injectable } from '@nestjs/common';
import { IUserrepository } from '../user-repository.interface';
import { User } from 'src/usuarios/entities/user-entity';
import { CreateUserDto } from 'src/usuarios/dto/create-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserrepository  {
    constructor(@Inject('USER_REPOSITORY') private readonly userRepository: Repository<User> ) {}
    async findAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }
    async findByIdUser(id: number): Promise<User> {
        return await this.userRepository.findOne({ where: { id } });
    }
    async createUser(data: CreateUserDto): Promise<User> {
        return await this.userRepository.save(data);
    }
    async updateUser(id: number, data: any): Promise<User> {
        return await this.userRepository.update({ id }, data).then(() => this.findByIdUser(id));
    }
}