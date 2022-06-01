import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginatedResponse } from '../../shared/generics/paginated-response.generic';
import { GameCreateDto } from './dtos/game-create.dto';
import { GameFindManyRequestDto } from './dtos/game-find-many-request.dto';
import { GameResponseDto } from './dtos/game-response.dto';
import { GameUpdateDto } from './dtos/game-update.dto';
import { GamesEntity } from './games.entity';

const mockGame = {
  id: 1,
  title: 'title string',
  price: 10.01,
  publisherId: 1,
  tags: ['foo', 'bee'],
  releaseDate: new Date(),
};

@Injectable()
export class GamesRepository {
  constructor(
    @InjectRepository(GamesEntity)
    private gamesEntityRepository: Repository<GamesEntity>,
  ) {}
  // TODO proper response
  async createOne(dto: GameCreateDto): Promise<GameResponseDto> {
    return {
      ...mockGame,
      ...dto,
    };
  }

  // TODO proper response
  async updateOne(id: number, dto: GameUpdateDto): Promise<GameResponseDto> {
    return {
      ...mockGame,
      id,
      ...dto,
    };
  }

  // TODO proper response
  async updateMany(
    dtos: (GameUpdateDto & { id: number })[],
  ): Promise<GameResponseDto[]> {
    return [mockGame];
  }

  async findOneById(id: number): Promise<GameResponseDto | undefined> {
    return { ...mockGame, id };
  }
  async findAllPaginated(
    filters: GameFindManyRequestDto,
  ): Promise<PaginatedResponse<GameResponseDto>> {
    return {
      items: [mockGame],
      totalCount: 1,
    };
  }

  async findAll(
    filters: Omit<GameFindManyRequestDto, 'page' | 'perPage'>,
  ): Promise<GameResponseDto[]> {
    return [mockGame];
  }

  async deleteOneById(id: number): Promise<void> {
    return;
  }

  async deleteManyByIds(ids: number[]): Promise<void> {
    return;
  }

  async isExistsById(id: number): Promise<boolean> {
    return true;
  }
}
