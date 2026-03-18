import { MiddelwareCorsMiddleware } from './middelware-cors.middleware';

describe('MiddelwareCorsMiddleware', () => {
  it('should be defined', () => {
    expect(new MiddelwareCorsMiddleware()).toBeDefined();
  });
});
