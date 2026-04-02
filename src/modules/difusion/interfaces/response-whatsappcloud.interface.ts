export interface ResponseWhatsAppCloud {
  messaging_product: string;
  contacts: Contacts[];
  messages: Messages[];
}

interface Contacts {
  input: string;
  wa_id: string;
}

interface Messages {
  id: string;
}
