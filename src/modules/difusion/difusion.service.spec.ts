import { Test, TestingModule } from '@nestjs/testing';
import { DifusionService } from './difusion.service';
import { TOKEN_PROVIDER } from './constants/difusion-whatsapp.constanst';
import { JwtService } from '@nestjs/jwt';
import { InternalServerErrorException } from '@nestjs/common';

describe('DifusionService', () => {
  let service: DifusionService;
  let whatsappService: any;
  let jwtService: any;

  beforeEach(async () => {
    whatsappService = {
      sendMessage: jest.fn().mockResolvedValue({}),
      sendTemplate: jest.fn().mockResolvedValue({}),
    };

    jwtService = {
      signAsync: jest.fn().mockResolvedValue('mock-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DifusionService,
        { provide: TOKEN_PROVIDER.WHATSAPP_SERVICE, useValue: whatsappService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<DifusionService>(DifusionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendTextMessage', () => {
    it('should send text message and return token', async () => {
      const dto = {
        to: '1234567890',
        recipient: 'Test User',
        idAgenda: 1,
        historia: 'H123',
        url: 'https://example.com',
        medicalReportName: 'Test Report',
      };

      const result = await service.sendTextMessage(dto);

      expect(result).toEqual({ token: 'mock-token' });
      expect(jwtService.signAsync).toHaveBeenCalledWith({ idAgenda: 1, historia: 'H123' });
      expect(whatsappService.sendMessage).toHaveBeenCalledWith({
        ...dto,
        url: 'https://example.com?token=mock-token',
      });
    });

    it('should throw InternalServerErrorException on error', async () => {
      whatsappService.sendMessage.mockRejectedValue(new Error('Network error'));

      await expect(service.sendTextMessage({} as any)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('sendTemplateText', () => {
    it('should send template and return token', async () => {
      const dto = {
        to: '1234567890',
        recipient: 'Test User',
        idAgenda: 2,
        historia: 'H456',
        url: 'https://example.com',
        medicalReportName: 'Test Report',
      };

      const result = await service.sendTemplateText(dto);

      expect(result).toEqual({ token: 'mock-token' });
      expect(jwtService.signAsync).toHaveBeenCalledWith({ idAgenda: 2, historia: 'H456' });
      expect(whatsappService.sendTemplate).toHaveBeenCalledWith({
        ...dto,
        url: 'https://example.com?token=mock-token',
      });
    });

    it('should throw InternalServerErrorException on error', async () => {
      whatsappService.sendTemplate.mockRejectedValue(new Error('Network error'));

      await expect(service.sendTemplateText({} as any)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
