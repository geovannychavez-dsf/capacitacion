import { Difusion } from './../entities/difusion.entity';
import { ResponseWhatsAppCloud } from './response-whatsappcloud.interface';
export interface DifusionWhatsappInterface {
  sendMessage(difusion: Difusion): Promise<ResponseWhatsAppCloud>;
  sendTemplate(difusion: Difusion): Promise<ResponseWhatsAppCloud>;
}
