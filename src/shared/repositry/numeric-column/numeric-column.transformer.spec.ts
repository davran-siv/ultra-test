import { NumericColumnTransformer } from './numeric-column.transformer';

describe('NumericColumnTransformer', () => {
  const numericColumnTransformer = new NumericColumnTransformer();
  describe('from', () => {
    it('should convert string to null', () => {
      expect(numericColumnTransformer.from('test')).toBeNull();
    });
    it('should convert null to null', () => {
      expect(numericColumnTransformer.from(null)).toBeNull();
    });
    it('should convert undefined to undefined', () => {
      expect(numericColumnTransformer.from(undefined)).toBeUndefined();
    });
    it('should convert string number to number', async () => {
      expect(numericColumnTransformer.from('11.22')).toEqual(11.22);
    });
  });

  describe('to', () => {
    it('should return input value without modification', () => {
      expect(numericColumnTransformer.to(null)).toBeNull();
      expect(numericColumnTransformer.to(undefined)).toBeUndefined();
      expect(numericColumnTransformer.to(11.22)).toEqual(11.22);
    });
  });
});
