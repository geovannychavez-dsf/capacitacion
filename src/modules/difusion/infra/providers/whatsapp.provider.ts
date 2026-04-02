import { ConfigService } from '@nestjs/config';
import { WhatsappCloudRepository } from '../repository/whatsapp-cloud.repository';
import { HttpService } from '@nestjs/axios';
import { TOKEN_PROVIDER } from '../../constants/difusion-whatsapp.constanst';

export const whatsappProviders = [
  {
    provide: TOKEN_PROVIDER.WHATSAPP_SERVICE,
    useFactory: (config: ConfigService, http: HttpService) =>
      new WhatsappCloudRepository(config, http),
    inject: [ConfigService, HttpService],
  },
];
