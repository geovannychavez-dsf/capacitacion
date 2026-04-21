import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const mockService = {
      login: jest.fn().mockResolvedValue({
        token: 'access-token',
        refreshToken: 'refresh-token',
        user: { id: 1, email: 'test@test.com' },
      }),
      refreshToken: jest.fn().mockResolvedValue({
        token: 'new-access-token',
        refreshToken: 'new-refresh-token',
      }),
      logout: jest.fn().mockReturnValue('Cierre de sesión exitoso'),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('llamar al servicio login y retornar el token y el refresh', async () => {
      const mockReq: any = {
        user: { id: 1, email: 'test@test.com', nombres: 'Test', telefono: '123', direccion: 'Addr' },
      };
      const mockRes: any = { cookie: jest.fn() };

      const result = await controller.login(mockReq, mockRes);

      expect(service.login).toHaveBeenCalledWith(mockReq.user, mockRes);
      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('refreshToken');
    });
  });

  describe('refreshToken', () => {
    it('should call service.refreshToken', async () => {
      const mockReq: any = { cookies: { refreshToken: 'token' } };
      const mockRes: any = { cookie: jest.fn() };

      const result = await controller.refreshToken(mockReq, mockRes);

      expect(service.refreshToken).toHaveBeenCalledWith(mockReq, mockRes);
      expect(result).toHaveProperty('token');
    });
  });

  describe('logout', () => {
    it('should call service.logout', () => {
      const mockRes: any = { clearCookie: jest.fn() };

      const result = controller.logout(mockRes);

      expect(service.logout).toHaveBeenCalledWith(mockRes);
      expect(result).toBe('Cierre de sesión exitoso');
    });
  });
});
