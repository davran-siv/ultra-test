import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../../config/env.validation';
import { GameResponseDto } from '../dtos/game-response.dto';
import { GamesRepository } from '../games.repository';

@Injectable()
export class GamesDeleteOldService {
  private readonly logger = new Logger(GamesDeleteOldService.name);

  constructor(
    private readonly gamesRepository: GamesRepository,
    private readonly configService: ConfigService<EnvironmentVariables, true>,
  ) {}

  async findAndDelete(): Promise<void> {
    this.logger.log('Running process');
    const gamesToRemove = await this.getOldGames();
    const gameIdsToRemove = gamesToRemove.map(({ id }) => id);
    await this.gamesRepository.deleteManyByIds(gameIdsToRemove);
    this.logger.log('Finished process');
  }

  getOldGames(): Promise<GameResponseDto[]> {
    const olderThan = this.configService.get(
      'REMOVE_GAMES_OLDER_THAN_IN_MONTHS',
    );

    const currentDate = new Date();

    const publishedBefore = new Date(
      currentDate.setMonth(currentDate.getMonth() - olderThan),
    );
    return this.gamesRepository.findAllOlderThen(publishedBefore);
  }
}
