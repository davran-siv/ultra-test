import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../../../config/env.validation';
import calculateNumberFromPercentage from '../../../../shared/utils/calculate-number-from-percentage/calculate-number-from-percentage.util';
import { dateBeforeMonths } from '../../../../shared/utils/date-before/date-before.util';
import { percentageOff } from '../../../../shared/utils/percentage-off/percentage-off.util';
import { GameResponseDto } from '../../dtos/game-response.dto';
import { GamesRepository } from '../../games.repository';

@Injectable()
export class GamesApplyDiscountService {
  private readonly logger = new Logger(GamesApplyDiscountService.name);

  constructor(
    private readonly gamesRepository: GamesRepository,
    private readonly configService: ConfigService<EnvironmentVariables, true>,
  ) {}

  async addDiscountToExpiringGames(ids?: number[]): Promise<void> {
    this.logger.log('Process running');
    const discountToExpiringGames = this.configService.get(
      'DISCOUNT_TO_EXPIRING_GAMES',
    );

    const expiringGames = await this.getExpiringGamesWithoutDiscount(ids);

    if (expiringGames.length) {
      const gamesWithUpdatedPrice = expiringGames.map(({ id, price }) => ({
        id,
        discount: calculateNumberFromPercentage(price, discountToExpiringGames),
      }));

      await this.gamesRepository.updateMany(gamesWithUpdatedPrice);
    }

    this.logger.log('Process successfully finished');
  }

  async getExpiringGamesWithoutDiscount(
    ids?: number[],
  ): Promise<GameResponseDto[]> {
    const publishedMoreThen = this.configService.get(
      'APPLY_DISCOUNT_TO_GAMES_PUBLISHED_MORE_THAN_MONTHS_AGO',
    );
    const publishedLessThen = this.configService.get(
      'APPLY_DISCOUNT_TO_GAMES_PUBLISHED_LESS_THAN_MONTHS_AGO',
    );

    const publishedBefore = dateBeforeMonths(publishedMoreThen);
    const publishedFrom = dateBeforeMonths(publishedLessThen);

    const expiringGames = await this.gamesRepository.findAll({
      releasedBefore: publishedBefore,
      releasedFrom: publishedFrom,
      ids,
      isDiscountApplied: false,
    });
    this.logger.log(
      `[getExpiringGames] Found ${
        expiringGames.length
      } game(s) with ids: ${expiringGames.map(({ id }) => id)}`,
    );
    return expiringGames;
  }
}
