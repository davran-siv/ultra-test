import { Injectable } from '@nestjs/common';
import { PublisherResponseDto } from './dtos/publisher-response.dto';
const mockedPublisher = {
  name: 'publisher',
  siret: 11,
  phone: '1223-455',
};

@Injectable()
export class PublisherRepository {
  async findOneByGameId(
    gameId: number,
  ): Promise<PublisherResponseDto | undefined> {
    return mockedPublisher;
  }
}
