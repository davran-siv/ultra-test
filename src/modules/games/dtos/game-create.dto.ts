import { IsDate, IsNumber, IsString, MinDate } from 'class-validator';
import { IsFeatureDate } from '../../../shared/validators/is-feature-date.validator';

export class GameCreateDto {
  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsNumber()
  publisherId: number;

  @IsNumber()
  tags: string[];

  @IsFeatureDate()
  @IsDate()
  releaseDate: Date;
}
