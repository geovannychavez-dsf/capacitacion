import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { HeaderGuard } from 'src/common/guard/header/header-guard';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const mockUserRepo = {
      find: jest.fn().mockResolvedValue([]),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsuariosService,
        {
          provide: 'USER_REPOSITORY',
          useValue: mockUserRepo,
        },
        { provide: 'DATA_SOURCE', useValue: {} },
      ],
    })
      .overrideGuard(HeaderGuard)
      .useValue({ canActivate: jest.fn(() => false) })
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
