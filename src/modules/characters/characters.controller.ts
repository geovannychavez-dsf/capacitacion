import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { GuardGuardJWT } from '../auth/guard/guard.guard';
import { ResponseCharactersDto } from './dtos/response-characters.dto';

@Controller('characters')
@UseGuards(GuardGuardJWT)
export class CharactersController {
    constructor(private readonly charactersService: CharactersService) { }


    @Get('sync')
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Return all characters' })
    @Get('sync')
    getAllCharacters() {
        return this.charactersService.sync();
    }


    @Post()
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Create one character' })
    create(@Body() character: Partial<ResponseCharactersDto>) {
        return this.charactersService.createCharacter(character);
    }
    @Get()
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Return all characters' })
    findAll() {
        return this.charactersService.findAllCharacters();
    }

    @Get(':id')
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Return one character' })
    findOne(@Param('id') id: number) {
        return this.charactersService.findByIdCharacter(id);
    }

    @Put(':id')
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Update one character' })
    update(@Param('id') id: number, @Body() character: Partial<ResponseCharactersDto>) {
        return this.charactersService.updateCharacter(id, character);
    }


    @Delete(':id')
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Delete one character' })
    delete(@Param('id') id: number) {
        return this.charactersService.deleteCharacter(id);
    }

}
