import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublishersResponseDto } from './dtos/publishers-response.dto';
import { PublishersEntity } from './publishers.entity';

@Injectable()
export class PublishersRepository {
  constructor(
    @InjectRepository(PublishersEntity)
    private publishersEntityRepository: Repository<PublishersEntity>,
  ) {}

  async findOneByGameId(
    gameId: number,
  ): Promise<PublishersResponseDto | undefined> {
    return this.publishersEntityRepository
      .createQueryBuilder('publisher')
      .leftJoin('publisher.games', 'game', 'game.id = :gameId', { gameId })
      .getOne();
  }

  async isExistsById(id: number): Promise<boolean> {
    const count = await this.publishersEntityRepository.countBy({ id });
    return count > 0;
  }
}
