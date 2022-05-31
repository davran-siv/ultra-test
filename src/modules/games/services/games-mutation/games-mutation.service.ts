import { Injectable } from '@nestjs/common';
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
  ) {}

  async createOne(dto: GameCreateDto): Promise<GameResponseDto> {
    const { id } = await this.repository.createOne(dto);
    return this.gamesQueryService.getOneById(id);
  }

  async updateOne(id: number, dto: GameUpdateDto): Promise<GameResponseDto> {
    await this.repository.updateOne(id, dto);
    return this.gamesQueryService.getOneById(id);
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.deleteOneById(id);
  }
}
