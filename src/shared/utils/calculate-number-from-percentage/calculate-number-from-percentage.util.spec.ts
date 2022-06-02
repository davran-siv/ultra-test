import calculateNumberFromPercentage from './calculate-number-from-percentage.util';

describe('calculateNumberFromPercentage', () => {
  it('should return amount of percentage', async () => {
    const percentage = calculateNumberFromPercentage(100, 10);
    expect(percentage).toBe(10);
  });
});
