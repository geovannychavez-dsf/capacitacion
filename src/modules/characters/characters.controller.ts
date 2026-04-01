import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { GuardGuardJWT } from '../auth/guard/guard.guard';
import { CreateCharactersDto, ResponseCharactersDto, UpdatCharactersDto } from './dtos';
import { getCharacterDecorator, postCharcterDecorator, putCharacterDecorator } from './decorator';
import { exceptionSwaggerDecorator } from 'src/common/decorators/exception-swagger.decorator';

@Controller('characters')
@UseGuards(GuardGuardJWT)
@exceptionSwaggerDecorator()
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Return all characters' })
  @Get('sync')
  getAllCharacters(): Promise<ResponseCharactersDto[]> {
    return this.charactersService.sync();
  }
  @Post()
  @postCharcterDecorator()
  create(@Body() character: Partial<CreateCharactersDto>): Promise<ResponseCharactersDto> {
    return this.charactersService.createCharacter(character);
  }
  @Get()
  @getCharacterDecorator({
    summary: 'Obtener todos los personajes',
    description: 'retorna todos los personajes',
  })
  findAll(): Promise<ResponseCharactersDto[]> {
    return this.charactersService.findAllCharacters();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Personaje obtenido correctamente',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'boolean', example: true },
        data: { $ref: getSchemaPath(ResponseCharactersDto) },
        message: { type: 'string', example: 'Operacion exitosa' },
      },
    },
  })
  @getCharacterDecorator({
    summary: 'Obtener todos los personajes',
    description: 'retorna todos los personajes',
  })
  findOne(@Param('id') id: number): Promise<ResponseCharactersDto> {
    return this.charactersService.findByIdCharacter(id);
  }

  @Put(':id')
  @putCharacterDecorator()
  update(
    @Param('id') id: number,
    @Body() character: Partial<UpdatCharactersDto>,
  ): Promise<ResponseCharactersDto> {
    return this.charactersService.updateCharacter(id, character);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'retorna todos los Character restantes',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'boolean', example: true },
        data: {
          type: 'array',
          items: { $ref: getSchemaPath(ResponseCharactersDto) },
        },
        message: { type: 'string', example: 'Operacion exitosa' },
      },
    },
  })
  delete(@Param('id') id: number): Promise<ResponseCharactersDto[]> {
    return this.charactersService.deleteCharacter(id);
  }
}
