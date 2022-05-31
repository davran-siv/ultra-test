import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { GamesRepository } from '../games.repository';

@Injectable()
export class IsGameExistsPipe implements PipeTransform {
  @Inject() gamesRepository: GamesRepository;

  async transform(value: any, metadata: ArgumentMetadata) {
    const id = 1;
    const isExistsById = await this.gamesRepository.isExistsById(id);
    if (!isExistsById) {
      throw new NotFoundException();
    }
  }
}
