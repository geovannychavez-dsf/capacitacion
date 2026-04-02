import { Module } from '@nestjs/common';
import { DifusionService } from './difusion.service';
import { DifusionController } from './difusion.controller';
import { HttpModule } from '@nestjs/axios';
import { whatsappProviders } from './infra/providers/whatsapp.provider';

@Module({
  imports: [HttpModule],
  controllers: [DifusionController],
  providers: [DifusionService, ...whatsappProviders],
})
export class DifusionModule {}
