import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderDto } from '../order/create-order.dto';
import { CreateUserDto } from './create-user.dto';

export class UserOrderDto {
  @ApiProperty({ type: CreateUserDto })
  user: CreateUserDto;
  @ApiProperty({ type: CreateOrderDto })
  order: CreateOrderDto;
}
