import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CronExpression } from '@nestjs/schedule/dist/enums/cron-expression.enum';
import { GamesDeleteOldService } from '../../modules/games/services/games-delete-old.service';

@Injectable()
export class DeleteOldGamesCronJob {
  private readonly logger = new Logger(DeleteOldGamesCronJob.name);
  constructor(private readonly gamesDeleteOldService: GamesDeleteOldService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async run() {
    this.logger.log(`Cron job started`);
    try {
      await this.gamesDeleteOldService.findAndDelete();
    } catch (error) {
      this.logger.error(`Failed to execute. Error: ${JSON.stringify(error)}`);
    }
  }
}
