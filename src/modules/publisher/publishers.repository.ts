import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublishersResponseDto } from './dtos/publishers-response.dto';
import { PublishersEntity } from './publishers.entity';

const mockedPublisher = {
  id: 1,
  name: 'publisher',
  siret: 11,
  phone: '1223-455',
};

@Injectable()
export class PublishersRepository {
  constructor(
    @InjectRepository(PublishersEntity)
    private publishersEntityRepository: Repository<PublishersEntity>,
  ) {}

  async findOneByGameId(
    gameId: number,
  ): Promise<PublishersResponseDto | undefined> {
    return mockedPublisher;
  }
}
