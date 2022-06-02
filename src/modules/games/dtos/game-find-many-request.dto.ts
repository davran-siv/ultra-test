import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class GameFindManyRequestDto {
  @IsNumber({}, { each: true })
  @IsOptional()
  ids?: number[];

  @IsDate()
  @IsOptional()
  releasedFrom?: Date;

  @IsDate()
  @IsOptional()
  releasedBefore?: Date;

  @IsBoolean()
  @IsOptional()
  isDiscountApplied?: boolean;

  @IsNumber({}, { each: true })
  @IsOptional()
  page? = 1;

  @IsNumber({}, { each: true })
  @IsOptional()
  @Max(100)
  @Min(1)
  perPage? = 10;
}
