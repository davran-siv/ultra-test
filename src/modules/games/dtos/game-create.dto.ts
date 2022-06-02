import {
  IsDate,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  MinDate,
} from 'class-validator';
import { IsFeatureDate } from '../../../shared/validators/is-feature-date.validator';

export class GameCreateDto {
  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsNumber()
  publisherId: number;

  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsFeatureDate()
  releaseDate: Date;
}
