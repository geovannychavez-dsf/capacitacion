import { HeaderGuard } from './authorication-header.guard';

describe('HeaderGuard', () => {
  it('should be defined', () => {
    expect(new HeaderGuard()).toBeDefined();
  });
});
