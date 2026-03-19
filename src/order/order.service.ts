import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order-entity';
import { Repository } from 'typeorm';
import { ResponseOrderDto } from './dto/respose-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY') private orderRepository: Repository<Order>,
  ) {}
  create(createOrderDto: CreateOrderDto) {
    return createOrderDto;
  }

  findAll() {
    return `This action returns all order`;
  }

  async findOne(id: number): Promise<ResponseOrderDto> {
    return await this.orderRepository.findOne({ where: { id: id } });
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<ResponseOrderDto> {
    return await this.orderRepository
      .update({ id }, updateOrderDto)
      .then(() => this.findOne(id));
  }
  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
