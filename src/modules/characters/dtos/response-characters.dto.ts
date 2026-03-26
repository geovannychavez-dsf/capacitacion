import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsString } from 'class-validator';
@ApiExtraModels()
export class ResponseCharactersDto {
  @ApiProperty({
    example: '1',
    description: 'ID del personaje',
    readOnly: true,
  })
  id: number;

  @ApiProperty({
    example: 'Rick Sanchez',
    description: 'Nombres del personaje',
  })
  @IsString()
  name: string

  @ApiProperty({
    example: 'Alive',
    description: 'Estado del personaje',
  })
  @IsString()
  status: string

  @ApiProperty({
    example: 'Human',
    description: 'Especie del personaje',
  })
  @IsString()
  species: string

  @ApiProperty({
    example: 'Male',
    description: 'Genero del personaje',
  })
  @IsString()
  gender: string

  @ApiProperty({
    example: 'Humanoid',
    description: 'Tipo del personaje',
    required: false
  })
  @IsString()
  type?: string

  @ApiProperty({
    example: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    description: 'Imagen del personaje',
    required: false
  })
  @IsString()
  image?: string

  @ApiProperty({
    example: '1',
    type: Date,
    description: 'Fecha de actualizacion del personaje',
    required: false,
    readOnly: true
  })
  @Exclude()
  @Type(() => Date)
  updatedAt?: Date

  @ApiProperty({

    type: Date,
    description: 'Fecha de creacion del personaje',
    required: false,
    readOnly: true
  })
  @Exclude()
  @Type(() => Date)
  createdAt?: Date
}
