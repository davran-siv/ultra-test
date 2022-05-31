import { Injectable, NotFoundException } from '@nestjs/common';
import { PublisherResponseDto } from '../dtos/publisher-response.dto';
import { PublisherRepository } from '../publisher.repository';

@Injectable()
export class PublisherQueryService {
  constructor(private readonly publisherRepository: PublisherRepository) {}

  async getOneByGameId(gameId: number): Promise<PublisherResponseDto> {
    const publisher = await this.findOneByGameId(gameId);

    if (!publisher) {
      throw new NotFoundException();
    }

    return publisher;
  }

  findOneByGameId(gameId: number): Promise<PublisherResponseDto | undefined> {
    return this.publisherRepository.findOneByGameId(gameId);
  }
}
