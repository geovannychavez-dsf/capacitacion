import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuarios.service';
import { TOKENSORM } from 'src/common/types/token-orm';

describe('usuariosService', () => {
  let service: UsuariosService;

  const mockUserRepo = {
    find: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        { provide: TOKENSORM.USER_REPOSITORY, useValue: mockUserRepo },
        { provide: TOKENSORM.DATA_SOURCE, useValue: {} },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
