import { IsNumber, IsOptional } from 'class-validator';

export class GameFindManyRequestDto {
  @IsNumber({}, { each: true })
  @IsOptional()
  id?: number[];

  @IsNumber({}, { each: true })
  @IsOptional()
  page? = 1;

  @IsNumber({}, { each: true })
  @IsOptional()
  perPage? = 10;
}
