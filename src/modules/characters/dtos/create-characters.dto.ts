import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsString, IsUrl } from 'class-validator';
@ApiExtraModels()
export class CreateCharactersDto {
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
  @IsString({ message: 'Coloque un nombre valido' })
  name: string;

  @ApiProperty({
    example: 'Alive',
    description: 'Estado del personaje',
  })
  @IsString({ message: 'Coloque un estado valido tipo texto' })
  status: string;

  @ApiProperty({
    example: 'Human',
    description: 'Especie del personaje',
  })
  @IsString({ message: 'Coloque una especie valida tipo texto' })
  species: string;

  @ApiProperty({
    example: 'Male',
    description: 'Genero del personaje',
  })
  @IsString({ message: 'Coloque un genero valido' })
  gender: string;

  @ApiProperty({
    example: 'Humanoid',
    description: 'Tipo del personaje',
    required: false,
  })
  @IsString({ message: 'Coloque un tipo valido ' })
  type?: string;

  @ApiProperty({
    example: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    description: 'Imagen del personaje',
    required: false,
  })
  @IsString({ message: 'Coloque una imagen valida' })
  @IsUrl({}, { message: 'Coloque una url valida' })
  image: string;

  @ApiProperty({
    type: Date,
    description: 'Fecha de actualizacion del personaje',
    required: false,
    readOnly: true,
  })
  @Exclude()
  @Type(() => Date)
  updatedAt?: Date;

  @ApiProperty({
    type: Date,
    description: 'Fecha de creacion del personaje',
    required: false,
    readOnly: true,
  })
  @Exclude()
  @Type(() => Date)
  createdAt?: Date;
}
