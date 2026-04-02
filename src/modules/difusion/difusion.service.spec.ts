import { Test, TestingModule } from '@nestjs/testing';
import { DifusionService } from './difusion.service';

describe('DifusionService', () => {
  let service: DifusionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DifusionService],
    }).compile();

    service = module.get<DifusionService>(DifusionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
