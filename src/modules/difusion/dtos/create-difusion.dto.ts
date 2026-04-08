import { ApiProperty } from '@nestjs/swagger';
import { IsUrl, MinLength } from 'class-validator';

export class CreateDifusionDto {
  @ApiProperty({
    example: '34666666666',
    type: String,
    required: true,
  })
  @MinLength(9, { message: 'El telefono no puede estar vacío' })
  to: string;

  @MinLength(1, { message: 'El estudio no puede estar vacío' })
  @ApiProperty({
    example: 'QR-CEREBRO SIMPLE de SAGRADA FAMILIA.',
    description: 'Estudio realizado',
    required: true,
  })
  medicalReportName: string;

  @MinLength(1, { message: 'El nombre no puede estar vacío' })
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre del destinatario',
    required: true,
  })
  recipient: string;

  @IsUrl({}, { message: 'El url debe ser una URL válida' })
  @ApiProperty({
    example: 'https://host.com',
    description: 'Url al estudio',
    format: 'url',
    required: true,
  })
  url: string;

  @MinLength(4, { message: 'La historia no puede estar vacía' })
  @ApiProperty({
    example: 'Historia del paciente',
    description: 'Historia del paciente',
    required: true,
    minLength: 4,
    type: String,
  })
  historia: string;

  @ApiProperty({
    example: 1234,
    description: 'Id de la agenda',
    required: true,
    type: Number,
  })
  idAgenda: number;
}
