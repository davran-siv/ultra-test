import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GameUpdateDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsOptional()
  publisherId: number;

  @IsNumber()
  @IsOptional()
  tags: string[];

  @IsNumber()
  @IsOptional()
  releaseDate: Date;
}
