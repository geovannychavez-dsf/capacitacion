import { Controller, Post, Body } from '@nestjs/common';
import { DifusionService } from './difusion.service';
import { CreateDifusionDto } from './dtos';

import { postDifusoDecorator } from './decorators/post-difuso.decorator';
import { exceptionSwaggerDecorator } from 'src/common/decorators/exception-swagger.decorator';
@Controller('difusion')
export class DifusionController {
  constructor(private readonly difusionService: DifusionService) {}

  @Post()
  @postDifusoDecorator()
  @exceptionSwaggerDecorator()
  sendTextMessage(@Body() createDifusionDto: CreateDifusionDto) {
    return this.difusionService.sendTextMessage(createDifusionDto);
  }

  @Post()
  @postDifusoDecorator()
  @exceptionSwaggerDecorator()
  sendTemplateText(@Body() createDifusionDto: CreateDifusionDto) {
    return this.difusionService.sendTemplateText(createDifusionDto);
  }
}
