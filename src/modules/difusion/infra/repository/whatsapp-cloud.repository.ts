import { ConfigService } from '@nestjs/config';
import { DifusionWhatsappInterface } from '../../interfaces/difusion-whatsapp.interface';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Difusion } from '../../entities/difusion.entity';
import { HttpService } from '@nestjs/axios';
import { TOKEN_PROVIDER, WHATSAPP_ENV } from '../../constants/difusion-whatsapp.constanst';
import { ResponseWhatsAppCloud } from '../../interfaces/response-whatsappcloud.interface';
import { catchError, firstValueFrom } from 'rxjs';
import { createMessage } from '../../adapters/whatsapp.adapter';
import { AxiosError } from 'axios';

@Injectable()
export class WhatsappCloudRepository implements DifusionWhatsappInterface {
  private readonly url;
  private readonly accessToken;
  private readonly apiVersion;
  private readonly phoneId;
  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.url = this.config.get<string>(WHATSAPP_ENV.URL);
    this.accessToken = this.config.get<string>(WHATSAPP_ENV.ACCESS_TOKEN);
    this.apiVersion = this.config.get<string>(WHATSAPP_ENV.API_VERSION);
    this.phoneId = this.config.get<string>(WHATSAPP_ENV.PHONE_ID);
  }
  async sendMessage(difusion: Difusion): Promise<ResponseWhatsAppCloud> {
    const messageBody = createMessage(difusion);
    const { data } = await firstValueFrom(
      this.httpService
        .post<ResponseWhatsAppCloud>(
          `${this.url}/${this.apiVersion}/${this.phoneId}/${TOKEN_PROVIDER.WHATSAPP_MESSAGE}`,
          {
            messaging_product: `${TOKEN_PROVIDER.WHATSAPP}`,
            to: `${difusion.to}`,
            type: 'text',
            text: {
              preview_url: false,
              body: `${messageBody}`,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          },
        )
        .pipe(
          catchError((error) => {
            if (error instanceof AxiosError) {
              throw new BadRequestException(error.response?.data);
            }
            throw new InternalServerErrorException('Hubo un error por favor intente mas tarde');
          }),
        ),
    );
    return { ...data };
  }
  async sendTemplate(difusion: Difusion): Promise<ResponseWhatsAppCloud> {
    //const messageBody = createMessage(difusion);
    const { data } = await firstValueFrom(
      this.httpService
        .post<ResponseWhatsAppCloud>(
          `${this.url}/${this.apiVersion}/${this.phoneId}/${TOKEN_PROVIDER.WHATSAPP_MESSAGE}`,
          {
            messaging_product: 'whatsapp',
            to: `${difusion.to}`,
            type: 'template',
            template: {
              name: 'hello_world',
              language: {
                code: 'en_US',
              },
            },
          },
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          },
        )
        .pipe(
          catchError((error) => {
            if (error instanceof AxiosError) {
              throw new BadRequestException(error.response?.data);
            }
            throw new InternalServerErrorException('Hubo un error por favor intente mas tarde');
          }),
        ),
    );
    return { ...data };
  }
}
