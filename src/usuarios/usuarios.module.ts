import { Module } from '@nestjs/common';
import { UsersController } from './usuarios.controller';
import { usuariosService } from './usuarios.service';
import { HeaderGuard } from 'src/header/header.guard';
import { userProviders } from './providers/user.providers';
import { DatabaseModule } from 'src/config/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [usuariosService, HeaderGuard, ...userProviders],
})
export class UsuariosModule {}
