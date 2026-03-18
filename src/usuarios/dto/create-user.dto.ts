import { IsString, IsEmail, IsDate, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
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
    default: '1995-06-15',
    required: true,
    type: Date,
  })
  @Type(() => Date)
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
    description: 'Constraseña del usuario',
    example: '#@123456@j@$',
    type: String,
    required: true,
  })
  @IsString()
  @MaxLength(6)
  password: string;

  @ApiProperty({
    example: 10,
    readOnly: true,
    description: 'id unico del usuario',
    type: Number,
  })
  id: number;
}
