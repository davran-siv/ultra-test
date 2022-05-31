import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getAbsoluteMappingEntries } from 'tsconfig-paths/lib/mapping-entry';
import { GameResponseDto } from '../dtos/game-response.dto';
import { GamesRepository } from '../games.repository';

@Injectable()
export class GamesDeleteOldService {
  private readonly logger = new Logger(GamesDeleteOldService.name);

  constructor(
    private readonly gamesRepository: GamesRepository,
    private readonly configService: ConfigService,
  ) {}

  async findAndDelete(): Promise<void> {
    this.logger.log('Running process');
    const gamesToRemove = await this.getOldGames();
    const gameIdsToRemove = gamesToRemove.map(({ id }) => id);
    await this.gamesRepository.deleteManyByIds(gameIdsToRemove);
    this.logger.log('Finished process');
  }

  getOldGames(): Promise<GameResponseDto[]> {
    const olderThan = this.configService.get('REMOVE_GAMES_OLDER_THAN');
    return this.gamesRepository.findAllOlderThen(olderThan);
  }
}
