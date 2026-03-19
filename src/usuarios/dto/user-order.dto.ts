import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { CreateUserDto } from './create-user.dto';

export class UserOrderDto {
  user: CreateUserDto;
  order: CreateOrderDto;
}
