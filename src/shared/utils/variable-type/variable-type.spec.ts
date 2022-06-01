import { isNullOrUndefined } from './variable-type.util';

describe('isNullOrUndefined', () => {
  it('number should be falsy', () => {
    expect(isNullOrUndefined(1)).toBeFalsy();
  });

  it('boolean should be falsy', () => {
    expect(isNullOrUndefined(false)).toBeFalsy();
  });

  it('null should be truthy', () => {
    expect(isNullOrUndefined(null)).toBeTruthy();
  });

  it('undefined should be truthy', () => {
    expect(isNullOrUndefined(undefined)).toBeTruthy();
  });
});
