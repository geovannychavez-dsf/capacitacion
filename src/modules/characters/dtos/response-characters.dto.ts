import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
@ApiExtraModels()
export class ResponseCharactersDto {
  @ApiProperty({
    example: '1',
    readOnly: true,
  })
  id: number;
  
  @ApiProperty({
    example: 'Rick Sanchez',
  })
  @IsString()
  name: string

  @ApiProperty({
    example: 'Alive',
  })
  @IsString()
  status: string

  @ApiProperty({
    example: 'Human',
  })
  @IsString()
  species: string

  @ApiProperty({
    example: 'Male',
  })
  @IsString()
  gender: string

  @ApiProperty({
    example: 'Humanoid',
  })
  @IsString()
  type: string

  @ApiProperty({
    example: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  })
  @IsString()
  image: string
}
