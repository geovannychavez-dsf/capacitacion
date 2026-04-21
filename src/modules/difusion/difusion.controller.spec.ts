import { Test, TestingModule } from '@nestjs/testing';
import { DifusionController } from './difusion.controller';
import { DifusionService } from './difusion.service';

describe('DifusionController', () => {
  let controller: DifusionController;
  let service: DifusionService;

  beforeEach(async () => {
    const mockService = {
      sendTextMessage: jest.fn().mockResolvedValue({ token: 'mock-token' }),
      sendTemplateText: jest.fn().mockResolvedValue({ token: 'mock-token' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DifusionController],
      providers: [{ provide: DifusionService, useValue: mockService }],
    }).compile();

    controller = module.get<DifusionController>(DifusionController);
    service = module.get<DifusionService>(DifusionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendTextMessage', () => {
    it('should call service.sendTextMessage', async () => {
      const dto = {
        to: '1234567890',
        recipient: 'Test User',
        idAgenda: 1,
        historia: 'H123',
        url: 'https://example.com',
        medicalReportName: 'Test Report',
      };

      const result = await controller.sendTextMessage(dto);

      expect(service.sendTextMessage).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ token: 'mock-token' });
    });
  });

  describe('sendTemplateText', () => {
    it('should call service.sendTemplateText', async () => {
      const dto = {
        to: '1234567890',
        recipient: 'Test User',
        idAgenda: 2,
        historia: 'H456',
        url: 'https://example.com',
        medicalReportName: 'Test Report',
      };

      const result = await controller.sendTemplateText(dto);

      expect(service.sendTemplateText).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ token: 'mock-token' });
    });
  });
});
