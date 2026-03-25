import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
export class RequestAuthDto {
  @ApiProperty({
    example: 'Beaulah6@yahoo.com',
    type: String,
    required: true,
  })
  @IsEmail({}, { message: 'Coloque un email valido' })
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    required: true,
    example: 'Password@1#23.',
    type: String,
  })
  @IsString({ message: 'Coloque una contraseña valida' })
  password: string;
}
