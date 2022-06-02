import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isDateString,
} from 'class-validator';

export function IsFeatureDate(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsFeatureDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!isDateString(value)) {
            return false;
          }
          const valueAsDate = new Date(value);
          return valueAsDate > new Date();
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a feature date`;
        },
      },
    });
  };
}
