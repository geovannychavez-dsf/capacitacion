import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { userPrismaProviders } from 'src/usuarios/providers/user-prisma.providers';
import { ConfigService } from '@nestjs/config';
import { JWT_CONFIG } from 'src/common/types/type-orm';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get(JWT_CONFIG.SECRET),
        signOptions: { expiresIn: config.get(JWT_CONFIG.EXPIRE,) },
      })
    }),
    PrismaModule
  ],
  controllers: [AuthController],
  providers: [AuthService, ...userPrismaProviders],
})
export class AuthModule { }
