import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Version } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';
import { ResponseUserDto } from './dto/response-user.dto';
import { getUserDocs, postUserDocs, updateUserDocs } from 'src/common/decoradores/usuario';

@ApiTags('usuarios')
@Controller('usuario')
@Controller({
  version: '1',
})
export class UsersController {
  constructor(private readonly userService: UsuariosService) {}
  @postUserDocs()
  @Post()
  createUser(@Body() CreateUserDto: CreateUserDto): Promise<boolean> {
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
  @getUserDocs()
  @Get()
  @Version('1')
  async findUsers(): Promise<ResponseUserDto[]> {
    return await this.userService.findusuarios();
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
  @getUserDocs()
  @Get(':id')
  @ApiParam({
    example: 10,
    name: 'id',
    type: String,
  })
  findUser(@Param('id') id: ParseIntPipe): Promise<ResponseUserDto> {
    return this.userService.findUser(+id);
  }

  @updateUserDocs()
  @Put(':id')
  @Version('1')
  @Version('2')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Get([':name', ':email'])
  findUserByEmailAndName(
    @Param('name') name: string,
    @Param('email') email: string,
  ): Promise<ResponseUserDto[]> {
    return this.userService.findUserByEmailAndName(name, email);
  }
}
