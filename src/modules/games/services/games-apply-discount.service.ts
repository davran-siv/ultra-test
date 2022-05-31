import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../../config/env.validation';
import { dateBeforeMonths } from '../../../shared/utils/date-before.util';
import { GameResponseDto } from '../dtos/game-response.dto';
import { GamesRepository } from '../games.repository';

@Injectable()
export class GamesApplyDiscountService {
  private readonly logger = new Logger(GamesApplyDiscountService.name);

  constructor(
    private readonly gamesRepository: GamesRepository,
    private readonly configService: ConfigService<EnvironmentVariables, true>,
  ) {}

  async addDiscountToExpiringGames(): Promise<void> {
    this.logger.log('Process running');
    const discountToExpiringGames = this.configService.get(
      'DISCOUNT_TO_EXPIRING_GAMES',
    );

    const expiringGames = await this.getExpiringGames();

    const gamesWithUpdatedPrice = expiringGames.map(({ id, price }) => ({
      id,
      price: percentageOff(price, discountToExpiringGames),
    }));

    await this.gamesRepository.updateMany(gamesWithUpdatedPrice);
    this.logger.log('Process successfully finished');
  }

  async getExpiringGames(): Promise<GameResponseDto[]> {
    const publishedMoreThen = this.configService.get(
      'APPLY_DISCOUNT_TO_GAMES_PUBLISHED_MORE_THAN_MONTHS_AGO',
    );
    const publishedLessThen = this.configService.get(
      'APPLY_DISCOUNT_TO_GAMES_PUBLISHED_LESS_THAN_MONTHS_AGO',
    );

    const publishedBefore = dateBeforeMonths(publishedMoreThen);
    const publishedFrom = dateBeforeMonths(publishedLessThen);

    const expiringGames = await this.gamesRepository.findAll({
      publishedBefore,
      publishedFrom,
    });
    this.logger.log(
      `Found ${expiringGames.length} game(s) with ids: ${expiringGames.map(
        ({ id }) => id,
      )}`,
    );
    return expiringGames;
  }
}
