import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
  Version,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateLuneDto } from './dto/update-user.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { usuariosService } from './usuarios.service';
import { UpdateUserDocs } from 'src/decoradores/Usuario/update-user.docs';
import { PostUserDocs } from 'src/decoradores/Usuario/post-user.docs';
import { GetUserDocs } from 'src/decoradores/Usuario/get-user.docs';
import { ResponseUserDto } from './dto/response-user.dto';

@ApiTags('usuarios')
@Controller('usuario')
@Controller({
  version: '1',
})
export class UsersController {
  constructor(private readonly userService: usuariosService) {}
  @PostUserDocs()
  @Post()
  createUser(@Body() CreateUserDto: CreateUserDto): boolean {
    return this.userService.createUser(CreateUserDto);
  }

  @ApiOperation({
    summary: 'Listar Usuarios',
    description: 'Este endpoint Muestra uns lista de todos los usuarios.',
  })
  @ApiOkResponse({
    description: 'Usuario creado correctamente',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'boolean', example: true },
        data: {
          type: 'array',
          items: { $ref: getSchemaPath(ResponseUserDto) },
        },
        message: { type: 'string', example: 'Operacion exitosa' },
      },
    },
    type: [ResponseUserDto],
  })
  @GetUserDocs()
  @Get()
  @Version('1')
  findUsers(): CreateUserDto[] {
    return this.userService.findusuarios();
  }

  @ApiOperation({
    summary: 'Obtener Usuario',
    description: 'Este endpoint Buscar un usuario en especifico por id.',
  })
  @ApiOkResponse({
    description: 'Usuario encontrado',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'boolean', example: true },
        data: {
          $ref: getSchemaPath(CreateUserDto),
        },
        message: { type: 'string', example: 'Operacion exitosa' },
      },
    },
  })
  @GetUserDocs()
  @Get(':id')
  @ApiParam({
    example: 10,
    name: 'id',
    type: String,
  })
  findUser(@Param('id') id: ParseIntPipe): ResponseUserDto {
    return this.userService.findUser(+id);
  }

  @UpdateUserDocs()
  @Put(':id')
  @Version('1')
  @Version('2')
  updateUser(
    @Param('id') id: string,
    @Body() updateLuneDto: UpdateLuneDto,
  ): CreateUserDto {
    return this.userService.updateUser(+id, updateLuneDto);
  }
}
