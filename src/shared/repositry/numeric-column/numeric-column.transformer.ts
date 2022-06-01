import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';
import { isNullOrUndefined } from '../../utils/variable-type/variable-type.util';

export class NumericColumnTransformer implements ValueTransformer {
  to(value?: number | null): number | null | undefined {
    return value;
  }

  from(value?: string | null): number | null | undefined {
    if (isNullOrUndefined(value)) {
      return value;
    }
    const res = parseFloat(value);
    return isNaN(res) ? null : res;
  }
}
