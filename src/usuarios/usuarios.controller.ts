import { Controller, Get, Post, Body, Put, Param, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/user/create-user.dto';
import { UpdateUserDto } from './dto/user/update-user.dto';
import {
  ApiBasicAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';
import { ResponseUserDto } from './dto/user/response-user.dto';
import { getUserDocs, postUserDocs, updateUserDocs } from 'src/common/decoradores/usuario';
import { CreateOrderDto } from './dto/order/create-order.dto';
import { UserOrderDto } from './dto/user/user-order.dto';
import { ResponseOrderDto } from './dto/order/respose-order.dto';

@ApiTags('usuarios')
@Controller({
  path: 'usuario',
  version: '1',
})
export class UsersController {
  constructor(private readonly userService: UsuariosService) { }
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
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @getUserDocs()
  @Get('search/:name/:email')
  @ApiBasicAuth()
  @ApiOperation({
    summary: 'Obtener usuario Usuario',
    description: 'Este endpoint Buscar un usuario en especifico por email y name.',
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
  })
  findUserByEmailAndName(
    @Param('name') name: string,
    @Param('email') email: string,
  ): Promise<ResponseUserDto[]> {
    return this.userService.findUserByEmailAndName(name, email);
  }
  @postUserDocs()
  @ApiBody({ type: UserOrderDto })
  @ApiOkResponse({
    description: 'Orsern creada correctamente',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'boolean', example: true },
        data: {
          $ref: getSchemaPath(CreateOrderDto),
        },
        message: { type: 'string', example: 'Operacion exitosa' },
      },
    },
  })
  @Post('crear-user-orden')
  createUsuarioWithOrden(
    @Body() data: { user: CreateUserDto; order: CreateOrderDto },
  ): Promise<ResponseOrderDto> {
    return this.userService.createUserWithOrder(data.user, data.order);
  }
}
