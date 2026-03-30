import { JwtService } from '@nestjs/jwt';
import { GuardGuardJWT } from './guard.guard';

describe('GuardGuard', () => {
  it('should be defined', () => {
    const mockJwtService = { signAsync: jest.fn(), verifyAsync: jest.fn() };
    expect(new GuardGuardJWT(mockJwtService as unknown as JwtService)).toBeDefined();
  });
});
