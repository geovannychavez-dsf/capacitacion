import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { ConfigService } from '@nestjs/config';
import { JWT_CONFIG } from 'src/common/types/type-orm';
import { userPrismaProviders } from '../usuarios/providers/user-prisma.provider';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get(JWT_CONFIG.SECRET),
        signOptions: { expiresIn: config.get(JWT_CONFIG.EXPIRE) },
      }),
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ...userPrismaProviders],
})
export class AuthModule {}
