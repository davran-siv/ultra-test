import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class GameFindManyRequestDto {
  @IsNumber({}, { each: true })
  @IsOptional()
  ids?: number[];

  @IsDate()
  @IsOptional()
  publishedFrom?: Date;

  @IsDate()
  @IsOptional()
  publishedBefore?: Date;

  @IsNumber({}, { each: true })
  @IsOptional()
  page? = 1;

  @IsNumber({}, { each: true })
  @IsOptional()
  perPage? = 10;
}
