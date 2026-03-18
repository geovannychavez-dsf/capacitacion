import { IsString, IsEmail, IsBoolean, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({
    example: 'Pedro Lopez',
    description: 'Nombres del usuario',
    required: true,
    type: String,
  })
  @IsString()
  name: string;
  @ApiProperty({
    description: 'Fecha de nacimiento del usuario',
    example: '2000-03-17T11:32:18.137Z',
    default: '{{{$timestamp}}}',
    required: true,
    type: Date,
  })
  @IsDate()
  birthdate: Date;

  @ApiProperty({
    description: 'Estado de Verificacion del email',
    example: false,
    type: Boolean,
  })
  emailVerified: boolean;

  @ApiProperty({
    description: 'estado del usuario',
    example: 'active',
    type: String,
    required: true,
  })
  @IsString()
  estatus: string;

  @ApiProperty({
    description: 'Email del usuario',
    example: 'Beaulah6@yahoo.com',
    required: true,
    type: String,
  })
  @IsEmail({}, { message: 'El formato del correo electrónico no es válido' })
  email: string;

  @ApiProperty({
    example: true,
    default: true,
    description: 'id unico del usuario',
    required: true,
    type: Boolean,
  })
  @IsBoolean()
  isActivo: boolean;

  @ApiProperty({
    example: 10,
    readOnly: true,
    description: 'id unico del usuario',
    type: Number,
  })
  id: number;
}
