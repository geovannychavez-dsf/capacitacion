import { ApiProperty } from '@nestjs/swagger';

export class ResponseAuthDto {
  @ApiProperty({ type: String, readOnly: true })
  token: string;

  @ApiProperty({ type: String, readOnly: true })
  refreshToken: string;

  @ApiProperty({ type: String, readOnly: true })
  message?: string;

  @ApiProperty({ 
    type: Object, 
    readOnly: true,
    example: { 
      id: 1, email: 'user@example.com',
      cedula: '123456789',
      nombres: 'Pedro Lopez',
      telefono: '0123456789',
      direccion: 'calle 123',
      isFirstLogin: true,
      rol:'paciente'
    }
  })
  user?: { id: number; email: string , cedula: string, nombres: string, telefono: string, direccion: string, isFirstLogin: boolean, rol: string };
}
