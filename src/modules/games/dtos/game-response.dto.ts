export class GameResponseDto {
  id: number;
  title: string;
  price: number;
  discount: number | null;
  publisherId: number;
  tags: string[];
  releaseDate: Date;
}
