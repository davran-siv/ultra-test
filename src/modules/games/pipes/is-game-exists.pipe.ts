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

  async transform(value: any, metadata: ArgumentMetadata) {
    const id = 1;
    const isExistsById = await this.gamesQueryService.isExistsById(id);
    if (!isExistsById) {
      throw new NotFoundException();
    }
  }
}
