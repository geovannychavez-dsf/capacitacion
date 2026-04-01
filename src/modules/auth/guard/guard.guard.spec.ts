import { GuardGuardJWT } from './guard.guard';

describe('GuardGuard', () => {
  it('should be defined', () => {
    const mockJwtService = { signAsync: jest.fn(), verifyAsync: jest.fn() };
    expect(new GuardGuardJWT(mockJwtService )).toBeDefined();
  });
});
