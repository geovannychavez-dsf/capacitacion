import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuarios.service';
import { TOKENSORM } from 'src/common/types/type-orm';

describe('usuariosService', () => {
  let service: UsuariosService;

  const mockUserRepo = {
    find: jest.fn().mockResolvedValue([]),
  };

  const mockTransactionRepo = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        { provide: TOKENSORM.USER_SERVICE_REPOSITORY, useValue: mockUserRepo },
        { provide: TOKENSORM.USER_TRANSACTION, useValue: mockTransactionRepo },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
