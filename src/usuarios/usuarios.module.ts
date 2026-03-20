import { Module } from '@nestjs/common';
import { UsersController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { HeaderGuard } from 'src/common/guard/header/header-guard';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { DatabaseModule } from 'src/config/database/database.module';
import { userPrismaProviders } from './providers/user-prisma.providers';

@Module({
  imports: [DatabaseModule,PrismaModule],
  controllers: [UsersController],
  providers: [UsuariosService, HeaderGuard, ...userPrismaProviders],
})
export class UsuariosModule {}
