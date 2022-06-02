import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PublishersQueryService } from '../../../publisher/services/publishers-query.service';
import { GameUpdatedEvent } from '../../cqrs/event/game-updated.event';
import { GameCreateDto } from '../../dtos/game-create.dto';
import { GameResponseDto } from '../../dtos/game-response.dto';
import { GameUpdateDto } from '../../dtos/game-update.dto';
import { GamesRepository } from '../../games.repository';
import { GamesQueryService } from '../games-query/games-query.service';

@Injectable()
export class GamesMutationService {
  constructor(
    private readonly repository: GamesRepository,
    private readonly gamesQueryService: GamesQueryService,
    private readonly eventEmitter: EventEmitter2,
    private readonly publishersQueryService: PublishersQueryService,
  ) {}

  async createOne(dto: GameCreateDto): Promise<GameResponseDto> {
    await this.publishersQueryService.throwNotFoundIfNotExists(dto.publisherId);
    const game = await this.repository.createOne(dto);
    return this.gamesQueryService.getOneById(game.id);
  }

  async updateOne(id: number, dto: GameUpdateDto): Promise<GameResponseDto> {
    if (dto.publisherId) {
      await this.publishersQueryService.throwNotFoundIfNotExists(
        dto.publisherId,
      );
    }
    await this.repository.updateOne(id, dto);
    this.eventEmitter.emit(GameUpdatedEvent.name, new GameUpdatedEvent({ id }));
    return this.gamesQueryService.getOneById(id);
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.deleteOneById(id);
  }
}
