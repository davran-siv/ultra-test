import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../../../config/env.validation';
import { dateBeforeMonths } from '../../../../shared/utils/date-before/date-before.util';
import { GameResponseDto } from '../../dtos/game-response.dto';
import { GamesRepository } from '../../games.repository';

@Injectable()
export class GamesDeleteOutdatedService {
  private readonly logger = new Logger(GamesDeleteOutdatedService.name);

  constructor(
    private readonly gamesRepository: GamesRepository,
    private readonly configService: ConfigService<EnvironmentVariables, true>,
  ) {}

  async findAndDelete(ids?: number[]): Promise<void> {
    this.logger.log('Running process');
    const gamesToRemove = await this.getOutdatedGames(ids);
    if (gamesToRemove.length) {
      const gameIdsToRemove = gamesToRemove.map(({ id }) => id);
      await this.gamesRepository.deleteManyByIds(gameIdsToRemove);
    }
    this.logger.log('Finished process');
  }

  async getOutdatedGames(ids?: number[]): Promise<GameResponseDto[]> {
    const olderThan = this.configService.get(
      'REMOVE_GAMES_PUBLISHED_MORE_THAN_MONTHS_AGO',
    );

    const publishedBefore = dateBeforeMonths(olderThan);

    const outdatedGames = await this.gamesRepository.findAll({
      publishedBefore,
      ids,
    });

    this.logger.log(
      `[getOutdatedGames] Found ${
        outdatedGames.length
      } game(s) with ids: ${outdatedGames.map(({ id }) => id)}`,
    );

    return outdatedGames;
  }
}
