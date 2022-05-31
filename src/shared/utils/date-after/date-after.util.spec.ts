import { dateAfterMonths } from './date-after.util';

describe('dateAfterMonths', () => {
  it('should return date plus N months', async () => {
    const date = new Date('2022-02-17');
    const dateWithAddedMonths = dateAfterMonths(18, date);
    expect(dateWithAddedMonths.getFullYear()).toBe(2023);
    expect(dateWithAddedMonths.getMonth()).toBe(7);
    expect(dateWithAddedMonths.getDate()).toBe(17);
  });
});
