import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateDifusionDto, ResponseDifusionDto } from './dtos';
import { TOKEN_PROVIDER } from './constants/difusion-whatsapp.constanst';
import { DifusionWhatsappInterface } from './interfaces/difusion-whatsapp.interface';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class DifusionService {
  private readonly logger = new Logger(DifusionService.name);
  constructor(
    @Inject(TOKEN_PROVIDER.WHATSAPP_SERVICE)
    private readonly whatsappService: DifusionWhatsappInterface,
    private readonly jwtService: JwtService,
  ) {}
  async sendTextMessage(createDifusionDto: CreateDifusionDto): Promise<ResponseDifusionDto> {
    let token = '';
    try {
       token = await this.ganerateTokenUrle({
        idAgenda: createDifusionDto.idAgenda,
        historia: createDifusionDto.historia,
      });

      createDifusionDto.url = createDifusionDto.url + `?token=${token}`;

      await this.whatsappService.sendMessage(createDifusionDto);
      return { token };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un error por favor intente mas tarde');
    } finally {
       this.logger.log(`Se envio un mensaje a: ${createDifusionDto.recipient}, número: ${createDifusionDto.to}, token: ${token}, resultado: Enviado correctamente)`);
    }
  }
  async sendTemplateText(createDifusionDto: CreateDifusionDto): Promise<ResponseDifusionDto> {
    let token = '';
    try {
       token = await this.ganerateTokenUrle({
        idAgenda: createDifusionDto.idAgenda,
        historia: createDifusionDto.historia,
      });

      createDifusionDto.url = createDifusionDto.url + `?token=${token}`;
      await this.whatsappService.sendTemplate(createDifusionDto);
      return { token };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Hubo un error por favor intente mas tarde');
    } finally {
       this.logger.log(`Se envio un mensaje a: ${createDifusionDto.recipient}, número: ${createDifusionDto.to}, token: ${token}, resultado: Enviado correctamente)`);
    }
  }
  private async ganerateTokenUrle(payloaduser: {
    idAgenda: number;
    historia: string;
  }): Promise<string> {
    const payload = { idAgenda: payloaduser.idAgenda, historia: payloaduser.historia };
    const token: string = await this.jwtService.signAsync(payload);
    return token;
  }
}
