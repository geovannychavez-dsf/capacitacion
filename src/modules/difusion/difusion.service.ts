import { HttpException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDifusionDto } from './dtos';
import { TOKEN_PROVIDER } from './constants/difusion-whatsapp.constanst';
import { DifusionWhatsappInterface } from './interfaces/difusion-whatsapp.interface';
import { ResponseWhatsAppCloud } from './interfaces/response-whatsappcloud.interface';

@Injectable()
export class DifusionService {
  constructor(
    @Inject(TOKEN_PROVIDER.WHATSAPP_SERVICE)
    private readonly whatsappService: DifusionWhatsappInterface,
  ) {}
  sendTextMessage(createDifusionDto: CreateDifusionDto): Promise<ResponseWhatsAppCloud> {
    try {
      return this.whatsappService.sendMessage(createDifusionDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw new InternalServerErrorException('Hubo un error api');
      }
      throw new InternalServerErrorException('Hubo un error por favor intente mas tarde');
    }
  }
  sendTemplateText(createDifusion: CreateDifusionDto): Promise<ResponseWhatsAppCloud> {
    try {
      return this.whatsappService.sendTemplate(createDifusion);
    } catch (error) {
      if (error instanceof HttpException) {
        throw new InternalServerErrorException('Hubo un error api');
      }
      throw new InternalServerErrorException('Hubo un error por favor intente mas tarde');
    }
  }
}
