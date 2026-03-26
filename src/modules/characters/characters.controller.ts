import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { GuardGuardJWT } from '../auth/guard/guard.guard';
import { ResponseCharactersDto } from './dtos';
import { postCharcterDecorator, putCharacterDecorator } from './decorator';

@Controller('characters')
@UseGuards(GuardGuardJWT)
export class CharactersController {
    constructor(private readonly charactersService: CharactersService) { }

    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Return all characters' })
    @Get('sync')
    async getAllCharacters(): Promise<ResponseCharactersDto[]> {
        return await this.charactersService.sync();
    }
    @Post()
    @postCharcterDecorator()
    async create(@Body() character: Partial<ResponseCharactersDto>): Promise<ResponseCharactersDto> {
        return await this.charactersService.createCharacter(character);
    }
    @Get()
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Return all characters' })
    async findAll(): Promise<ResponseCharactersDto[]> {
        return await this.charactersService.findAllCharacters();
    }

    @Get(':id')
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Return one character' })
    async findOne(@Param('id') id: number): Promise<ResponseCharactersDto> {
        return await this.charactersService.findByIdCharacter(id);
    }

    @Put(':id')
    @putCharacterDecorator()
    update(@Param('id') id: number, @Body() character: Partial<ResponseCharactersDto>) {
        return this.charactersService.updateCharacter(id, character);
    }


    @Delete(':id')
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Delete one character' })
    async delete(@Param('id') id: number): Promise<ResponseCharactersDto[]> {
        return await this.charactersService.deleteCharacter(id);
    }

}
