import { Test, TestingModule } from '@nestjs/testing';
import { DifusionController } from './difusion.controller';
import { DifusionService } from './difusion.service';

describe('DifusionController', () => {
  let controller: DifusionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DifusionController],
      providers: [DifusionService],
    }).compile();

    controller = module.get<DifusionController>(DifusionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
