import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';
import { TOKENSORM } from 'src/common/types/type-orm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

describe('CharactersService', () => {
  let service: CharactersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharactersService,
        { provide: ConfigService, useValue: { get: jest.fn() } },
        { provide: HttpService, useValue: { get: jest.fn() } },
        { provide: TOKENSORM.CHARACTER_REPOSITORY, useValue: {} },
      ],
    }).compile();

    service = module.get<CharactersService>(CharactersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
