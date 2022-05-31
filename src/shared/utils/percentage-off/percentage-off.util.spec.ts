import { percentageOff } from './percentage-off.util';

describe('percentageOff', () => {
  it('should return amount minus percentage', async () => {
    const percentage = percentageOff(100, 10);
    expect(percentage).toBe(90);
  });
});
