import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuarios.service';

describe('usuariosService', () => {
  let service: UsuariosService;

  const mockUserRepo = {
    find: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        { provide: 'USER_REPOSITORY', useValue: mockUserRepo },
        { provide: 'DATA_SOURCE', useValue: {} },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
