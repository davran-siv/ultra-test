import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { GamesQueryService } from '../services/games-query/games-query.service';

@Injectable()
export class IsGameExistsPipe implements PipeTransform {
  @Inject() gamesQueryService: GamesQueryService;

  async transform(value: number, metadata: ArgumentMetadata) {
    const isExistsById = await this.gamesQueryService.isExistsById(value);
    if (!isExistsById) {
      throw new NotFoundException(`Game not found by id: ${value}`);
    }
    return value;
  }
}
