import { Module } from '@nestjs/common';
import { UsersController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { HeaderGuard } from 'src/common/guard/header/authorication-header.guard';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { DatabaseModule } from 'src/config/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_CONFIG } from 'src/common/types/type-orm';
import { GuardGuardJWT } from 'src/modules/auth/guard/guard.guard';
import { userProviders } from './providers/user-typeorm.provider';

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
  providers: [UsuariosService, HeaderGuard, GuardGuardJWT, ...userProviders],
  exports: [GuardGuardJWT],
})
export class UsuariosModule {}
