import { Module } from '@nestjs/common';
import { UsersController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { userProviders } from './providers/user-providers';
import { DatabaseModule } from 'src/config/database/database.module';
import { HeaderGuard } from 'src/common/guard/header/header-guard';
import { PrismaModule } from 'src/config/prisma/prisma.module';

@Module({
  imports: [DatabaseModule, PrismaModule],
  controllers: [UsersController],
  providers: [UsuariosService, HeaderGuard, ...userProviders],
})
export class UsuariosModule {}
