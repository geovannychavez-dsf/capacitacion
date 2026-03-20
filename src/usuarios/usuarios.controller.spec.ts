import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { HeaderGuard } from 'src/common/guard/header/header-guard';
import { TOKENSORM } from 'src/common/types/type-orm';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUserRepo = {
    find: jest.fn().mockResolvedValue([]),
  };

  const mockTransactionRepo = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsuariosService,
        { provide: TOKENSORM.USER_SERVICE_REPOSITORY, useValue: mockUserRepo },
        { provide: TOKENSORM.USER_TRANSACTION, useValue: mockTransactionRepo },
      ],
    })
      .overrideGuard(HeaderGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
