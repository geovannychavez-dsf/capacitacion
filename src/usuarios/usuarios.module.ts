import { Module } from '@nestjs/common';
import { UsersController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { userProviders } from './providers/user-providers';
import { DatabaseModule } from 'src/config/database/database.module';
import { HeaderGuard } from 'src/common/guard/header/header-guard';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsuariosService, HeaderGuard, ...userProviders],
})
export class UsuariosModule {}
