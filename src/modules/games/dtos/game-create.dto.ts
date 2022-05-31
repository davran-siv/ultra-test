import { IsNumber, IsString } from 'class-validator';

export class GameCreateDto {
  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsNumber()
  publisherId: number;

  @IsNumber()
  tags: string[];

  @IsNumber()
  releaseDate: Date;
}
