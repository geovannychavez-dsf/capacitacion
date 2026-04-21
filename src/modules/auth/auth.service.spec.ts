import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { TOKENSORM } from 'src/common/types/type-orm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: any;
  let jwtService: any;
  let configService: any;

  beforeEach(async () => {
    userRepository = {
      findUserByEmail: jest.fn(),
    };

    jwtService = {
      signAsync: jest.fn(),
      verifyAsync: jest.fn(),
    };

    configService = {
      get: jest.fn(() => {
        const config = {
          JWT_SECRET: 'test-secret',
          REFRESH_SECRET: 'refresh-secret',
          JWT_EXPIRES_IN: '1h',
          REFRESH_EXPIRES_IN: '1d',
        };
        return config;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: jwtService },
        { provide: ConfigService, useValue: configService },
        { provide: TOKENSORM.USER_SERVICE_REPOSITORY, useValue: userRepository },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('validar el usuario', async () => {
      const mockUser = {
        id: 1,
        email: 'test@test.com',
        name: 'Test',
        telefono: '123',
        direccion: 'Address',
        birthdate: new Date(),
        emailVerified: true,
        estatus: 'true'
      };

      userRepository.findUserByEmail.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));

      const result = await service.validateUser('test@test.com', 'password123');

      expect(result).toEqual({id: mockUser.id, email: mockUser.email, name: mockUser.name , birthdate: mockUser.birthdate, emailVerified: mockUser.emailVerified, estatus: mockUser.estatus});
    });

    it('mostrar UnauthorizedException cuando el usuario no se encuentra', async () => {
      userRepository.findUserByEmail.mockResolvedValue(null);

      await expect(service.validateUser('test@test.com', 'password123')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('login', () => {
    it('retornar los tokens y el usuario', async () => {
      const mockUser = {
        id: 1,
        email: 'test@test.com',
        name: 'John Doe',
        emailVerified: true,
        birthdate: new Date(),
        estatus: 'true',
        rol: 'paciente'
      };

      jwtService.signAsync.mockResolvedValue('mock-token');

      const mockRes: any = {
        cookie: jest.fn(),
      };

      const result = await service.login(mockUser, mockRes);

      expect(result).toHaveProperty('token', 'mock-token');
      expect(result).toHaveProperty('refreshToken', 'mock-token');
      expect(result.user?.nombres).toEqual(mockUser.name);
      expect(mockRes.cookie).toHaveBeenCalledTimes(2);
    });
  });

  describe('refreshToken', () => {
    it('generar nuevos tokens en base al refresh token', async () => {
      const mockReq: any = {
        cookies: { refreshToken: 'valid-refresh-token' },
      };

      const mockRes: any = {
        cookie: jest.fn(),
      };

      jwtService.verifyAsync.mockResolvedValue({ email: 'test@test.com', usuario: 1 });
      jwtService.signAsync.mockResolvedValue('new-token');

      const result = await service.refreshToken(mockReq, mockRes);

      expect(result).toHaveProperty('token', 'new-token');
      expect(result).toHaveProperty('refreshToken', 'new-token');
    });

    it('mostrar UnauthorizedException cuando no se proporciona un refresh token', async () => {
      const mockReq: any = { cookies: {} };
      const mockRes: any = { cookie: jest.fn() };

      await expect(service.refreshToken(mockReq, mockRes)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('logout', () => {
    it('limpiar cookies', () => {
      const mockRes: any = {
        clearCookie: jest.fn(),
      };

      const result = service.logout(mockRes);
      console.log("result",result);
      expect(mockRes.clearCookie).toHaveBeenCalledWith('accessToken');
      expect(mockRes.clearCookie).toHaveBeenCalledWith('refreshToken');
    });
  });
});
