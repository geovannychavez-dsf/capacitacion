export const WHATSAPP_ENV = {
  URL: 'URL_WHATSAPP',
  PHONE_ID: 'WA_PHONE_NUMBER_ID',
  ACCESS_TOKEN: 'CLOUD_API_ACCESS_TOKEN',
  API_VERSION: 'CLOUD_API_VERSION',
};
export const TOKEN_PROVIDER = {
  WHATSAPP: 'whatsapp',
  WHATSAPP_SERVICE: 'WHATSAPP_SERVICE',
  WHATSAPP_ACOUNT: 'account',
  WHATSAPP_MESSAGE: 'messages',
  WHATSAPP_TEMPLATE: 'template',
};

export const TEMPLATE_WHATSAPP = `*Dispensario Sagrada Familia.*
{{recipient}}, ya tiene disponible el estudio: *{{medicalReportName}}*

Acceda directamente con este enlace:
{{url}}

Por seguridad este enlace tiene una validez temporal. Si ya no es válido siempre
puede acceder a su estudio desde:
{{url}}`;
