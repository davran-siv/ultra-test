import { plainToClass } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  @IsOptional()
  NODE_ENV = 'local';

  @IsNumber()
  SERVICE_PORT: number;

  @IsString()
  @IsOptional()
  DB_HOST = 'localhost';

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsNumber()
  REMOVE_GAMES_OLDER_THAN_IN_MONTHS: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
