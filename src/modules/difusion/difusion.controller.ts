import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { DifusionService } from './difusion.service';
import { CreateDifusionDto } from './dtos';

import { postDifusoDecorator } from './decorators/post-difuso.decorator';
import { exceptionSwaggerDecorator } from 'src/common/decorators/exception-swagger.decorator';
import { GuardGuardJWT } from '../auth/guard/guard.guard';

@Controller('notificaciones')
@UseGuards(GuardGuardJWT)
@exceptionSwaggerDecorator()
export class DifusionController {
  constructor(private readonly difusionService: DifusionService) {}

  @Post('whatsapp')
  @postDifusoDecorator()
  sendTextMessage(@Body() createDifusionDto: CreateDifusionDto) {
    return this.difusionService.sendTextMessage(createDifusionDto);
  }

  @Post('sendTemplateText')
  @postDifusoDecorator()
  sendTemplateText(@Body() createDifusionDto: CreateDifusionDto) {
    return this.difusionService.sendTemplateText(createDifusionDto);
  }
}
