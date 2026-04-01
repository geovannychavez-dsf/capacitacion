import { ApiProperty } from '@nestjs/swagger';
import { Double } from 'typeorm';

export class ResponseOrderDto {
  @ApiProperty({
    example: 'Compras alimentos',
    description: 'Descripcion de la Orden',
    type: String,
  })
  description: string;

  @ApiProperty({
    example: 10,
    description: 'Valor de la Orden',
    type: Number,
  })
  valor: Double;

  @ApiProperty({
    example: 1,
    description: 'Usario al que pertenece la orden',
    readOnly: true,
    type: Number,
  })
  authorId: number;
}
