import { Module } from '@nestjs/common';
import { UsersController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { HeaderGuard } from 'src/common/guard/header/header-guard';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { DatabaseModule } from 'src/config/database/database.module';
import { userPrismaProviders } from './providers/user-prisma.providers';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_CONFIG } from 'src/common/types/type-orm';
import { GuardGuardJWT } from 'src/modules/auth/guard/guard.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get(JWT_CONFIG.SECRET),
        signOptions: { expiresIn: config.get(JWT_CONFIG.EXPIRE) },
      }),
    }),
    DatabaseModule,
    PrismaModule,
  ],
  controllers: [UsersController],
  providers: [UsuariosService, HeaderGuard, GuardGuardJWT, ...userPrismaProviders],
  exports: [GuardGuardJWT],
})
export class UsuariosModule {}
