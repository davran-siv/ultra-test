import { Injectable, NotFoundException } from '@nestjs/common';
import { PublishersResponseDto } from '../dtos/publishers-response.dto';
import { PublishersRepository } from '../publishers.repository';

@Injectable()
export class PublishersQueryService {
  constructor(private readonly publisherRepository: PublishersRepository) {}

  async getOneByGameId(gameId: number): Promise<PublishersResponseDto> {
    const publisher = await this.findOneByGameId(gameId);

    if (!publisher) {
      throw new NotFoundException();
    }

    return publisher;
  }

  findOneByGameId(gameId: number): Promise<PublishersResponseDto | undefined> {
    return this.publisherRepository.findOneByGameId(gameId);
  }

  async throwNotFoundIfNotExists(id: number): Promise<void> {
    const isExits = await this.publisherRepository.isExistsById(id);
    if (isExits) {
      return;
    }
    throw new NotFoundException(`Publisher not exists by id: ${id}`);
  }
}
