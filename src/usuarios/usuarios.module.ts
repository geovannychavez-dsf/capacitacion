import { Module } from '@nestjs/common';
import { UsersController } from './usuarios.controller';
import { usuariosService } from './usuarios.service';
import { HeaderGuard } from 'src/header/header.guard';

@Module({
  controllers: [UsersController],
  providers: [usuariosService, HeaderGuard],
})
export class UsuariosModule {}
