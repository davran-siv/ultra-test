import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginatedResponse } from '../../../../shared/generics/paginated-response.generic';
import { GameFindManyRequestDto } from '../../dtos/game-find-many-request.dto';
import { GameResponseDto } from '../../dtos/game-response.dto';
import { GamesRepository } from '../../games.repository';

@Injectable()
export class GamesQueryService {
  constructor(private readonly repository: GamesRepository) {}

  async getOneById(id: number): Promise<GameResponseDto> {
    const game = await this.findOneById(id);

    if (!game) {
      throw new NotFoundException(`Game not found by id: ${id}`);
    }

    return game;
  }

  async findAllPaginated(
    filters: GameFindManyRequestDto = {},
  ): Promise<PaginatedResponse<GameResponseDto>> {
    return this.repository.findAllPaginated(filters);
  }

  findOneById(id: number): Promise<GameResponseDto | undefined> {
    return this.repository.findOneById(id);
  }

  isExistsById(id: number): Promise<boolean> {
    return this.repository.isExistsById(id);
  }
}
