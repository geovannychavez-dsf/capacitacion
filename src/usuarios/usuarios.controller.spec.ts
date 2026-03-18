import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './usuarios.controller';
import { usuariosService } from './usuarios.service';
import { HeaderGuard } from 'src/header/header.guard';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [usuariosService],
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
