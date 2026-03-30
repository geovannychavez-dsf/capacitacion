import { Test, TestingModule } from '@nestjs/testing';
import { CharactersController } from './characters.controller';
import { GuardGuardJWT } from '../auth/guard/guard.guard';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { TOKENSORM } from 'src/common/types/type-orm';
import { CharactersService } from './characters.service';

describe('CharactersController', () => {
  let controller: CharactersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharactersService,
        { provide: ConfigService, useValue: { get: jest.fn() } },
        { provide: HttpService, useValue: { get: jest.fn() } },
        { provide: TOKENSORM.CHARACTER_REPOSITORY, useValue: {} },
      ],
      controllers: [CharactersController],
    })
      .overrideGuard(GuardGuardJWT)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<CharactersController>(CharactersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
