import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, UseGuards } from '@nestjs/common';

import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';
import { getUserDocs, postUserDocs, updateUserDocs } from 'src/common/decorators/usuario';
import { exceptionSwaggerDecorator } from 'src/common/decorators/exception-swagger.decorator';
import { GuardGuardJWT } from '../auth/guard';
import { CreateUserDto, ResponseUserDto, UpdateUserDto, UserOrderDto } from './dtos/user';
import { CreateOrderDto } from './dtos/order/create-order.dto';
import { ResponseOrderDto } from './dtos/order/respose-order.dto';

@ApiTags('usuarios')
@Controller({
  path: 'usuario',
})
@UseGuards(GuardGuardJWT)
export class UsersController {
  constructor(private readonly userService: UsuariosService) {}
  @postUserDocs()
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<boolean> {
    return await this.userService.createUser(createUserDto);
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
  @exceptionSwaggerDecorator()
  @Get(':id')
  @ApiParam({
    example: 10,
    name: 'id',
    type: Number,
  })
  findUser(@Param('id', ParseIntPipe) id: number): Promise<ResponseUserDto> {
    return this.userService.findUser(+id);
  }

  @updateUserDocs()
  @exceptionSwaggerDecorator()
  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @getUserDocs()
  @Get('search/:name/:email')
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
  @exceptionSwaggerDecorator()
  findUserByEmailAndName(
    @Param('name') name: string,
    @Param('email') email: string,
  ): Promise<ResponseUserDto[]> {
    return this.userService.findUserByEmailAndName(name, email);
  }
  @postUserDocs()
  @exceptionSwaggerDecorator()
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
