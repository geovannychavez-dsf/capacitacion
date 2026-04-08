import { Module } from '@nestjs/common';
import { DifusionService } from './difusion.service';
import { DifusionController } from './difusion.controller';
import { HttpModule } from '@nestjs/axios';
import { whatsappProviders } from './infra/providers/whatsapp.provider';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_CONFIG } from 'src/common/types/type-orm';

@Module({
  imports: [
    HttpModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get(JWT_CONFIG.SECRET),
        signOptions: { expiresIn: config.get(JWT_CONFIG.EXPIRE) },
      }),
    }),
  ],
  controllers: [DifusionController],
  providers: [DifusionService, ...whatsappProviders],
})
export class DifusionModule {}
