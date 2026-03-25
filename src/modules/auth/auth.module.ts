import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { userPrismaProviders } from 'src/usuarios/providers/user-prisma.providers';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'JWT_CONFIGSECRET',
      signOptions: { expiresIn: '1h' },
    }),
    PrismaModule
  ],
  controllers: [AuthController],
  providers: [AuthService, ...userPrismaProviders],
})
export class AuthModule { }
