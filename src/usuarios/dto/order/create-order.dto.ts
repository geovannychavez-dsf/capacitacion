import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    example: 'Compras alimentos',
    description: 'Descripcion de la Orden',
    required: true,
    type: String,
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 10,
    description: 'Valor de la Orden',
    required: true,
    type: Number,
  })
  @IsNumber()
  valor: number;

  @ApiProperty({
    example: 1,
    description: 'Usuario al que pertenece la orden',
    readOnly: true,
    type: Number,
  })
  authorId: number;
}
