import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
@ApiExtraModels()
export class ResponseUserDto {
  @ApiProperty({
    example: 'Pedro Lopez',
  })
  name: string;
  @ApiProperty({
    description: 'Fecha de nacimiento del usuario',
    example: '2026-03-17T11:32:18.137Z',
    type: Date,
  })
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
  })
  @IsString()
  estatus: string;

  @ApiProperty({
    description: 'Email del usuario',
    example: 'Beaulah6@yahoo.com',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'Rol del usuario',
    example: 'paciente',
    type: String,
  })
  rol: string;

  @ApiProperty({
    example: 10,
    description: 'id unico del usuario',
    type: Number,
  })
  id: number;
}
