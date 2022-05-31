import { dateBeforeMonths } from './date-before.util';

describe('dateBeforeMonths', () => {
  it('should return date minus N months', async () => {
    const date = new Date('2022-02-17');
    const dateWithAddedMonths = dateBeforeMonths(18, date);
    expect(dateWithAddedMonths.getFullYear()).toBe(2020);
    expect(dateWithAddedMonths.getMonth()).toBe(7);
    expect(dateWithAddedMonths.getDate()).toBe(17);
  });
});
