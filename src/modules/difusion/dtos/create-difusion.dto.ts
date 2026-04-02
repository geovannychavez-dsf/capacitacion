import { ApiProperty } from '@nestjs/swagger';
import {  IsUrl, MinLength } from 'class-validator';

export class CreateDifusionDto {
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

  @ApiProperty({
    example: '34666666666',
    type: String,
    required: true,
  })
  to: string;
}
