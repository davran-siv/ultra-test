import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
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
    return this.gamesEntityRepository.save(dto);
  }

  async updateOne(id: number, dto: Partial<GamesEntity>): Promise<void> {
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
  ): Promise<PaginatedResponse<GamesEntity>> {
    const perPage = filters.perPage ?? 10;
    const offset = ((filters.page ?? 1) - 1) * perPage;
    const queryBuilder = this.getQueryBuilderForFetchingAll(filters);
    queryBuilder.offset(offset);
    queryBuilder.take(perPage);
    const [items, totalCount] = await queryBuilder.getManyAndCount();

    return {
      items,
      totalCount,
    };
  }

  async findAll(
    filters: Omit<GameFindManyRequestDto, 'page' | 'perPage'>,
  ): Promise<GamesEntity[]> {
    const queryBuilder = this.getQueryBuilderForFetchingAll(filters);
    return queryBuilder.getMany();
  }

  private getQueryBuilderForFetchingAll(
    filters: Omit<GameFindManyRequestDto, 'page' | 'perPage'>,
  ): SelectQueryBuilder<GamesEntity> {
    const queryBuilder = this.gamesEntityRepository.createQueryBuilder('game');
    if (filters.ids?.length) {
      queryBuilder.where('game.id IN (:...ids)', { ids: filters.ids });
    }
    if (filters.releasedFrom) {
      queryBuilder.where('game.release_date > :releasedFrom', {
        releasedFrom: filters.releasedFrom,
      });
    }
    if (filters.releasedBefore) {
      queryBuilder.where('game.release_date < :releasedBefore', {
        releasedBefore: filters.releasedBefore,
      });
    }
    if (filters.isDiscountApplied) {
      queryBuilder.where('game.discount < :releasedBefore', {
        releasedBefore: filters.releasedBefore,
      });
    }
    return queryBuilder;
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
