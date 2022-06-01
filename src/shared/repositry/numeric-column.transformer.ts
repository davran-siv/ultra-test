import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer'
import { isNullOrUndefined } from '../../utils'

export class NumericColumnTransformer implements ValueTransformer {
  to(value?: number | null): number | null | undefined {
    return value
  }

  from(value?: string | null): number | null | undefined {
    if (isNullOrUndefined(value)) {
      return value
    }
    const res = parseFloat(value)
    return isNaN(res) ? null : res
  }
}

export const convertAllDataToNumeric = <T, K extends keyof T>(data: T): Record<K, number> => {
  const transformer = new NumericColumnTransformer
  return Object.entries(data).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: transformer.from(value),
    }
  }, {}) as Record<K, number>
}
