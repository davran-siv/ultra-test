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

  async createOne(dto: GameCreateDto): Promise<Omit<GamesEntity, 'publisher'>> {
    return this.gamesEntityRepository.create(dto);
  }

  async updateOne(id: number, dto: GameUpdateDto): Promise<void> {
    await this.gamesEntityRepository.update(id, dto);
  }

  async updateMany(dtos: (GameUpdateDto & { id: number })[]): Promise<void> {
    await this.gamesEntityRepository.save(dtos);
  }

  async findOneById(
    id: number,
  ): Promise<Omit<GamesEntity, 'publisher'> | undefined> {
    return this.gamesEntityRepository.findOneBy({ id });
  }
  async findAllPaginated(
    filters: GameFindManyRequestDto,
  ): Promise<PaginatedResponse<GameResponseDto>> {
    // return this.gamesEntityRepository.findAndCountBy({ id });

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
    await this.gamesEntityRepository.softDelete(id);
  }

  async deleteManyByIds(ids: number[]): Promise<void> {
    await this.gamesEntityRepository.softDelete(ids);
  }

  async isExistsById(id: number): Promise<boolean> {
    const count = await this.gamesEntityRepository.countBy({ id });
    return count > 0;
  }
}
