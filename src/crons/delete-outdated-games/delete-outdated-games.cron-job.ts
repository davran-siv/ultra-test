import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronExpression } from '@nestjs/schedule/dist/enums/cron-expression.enum';
import { EnvironmentVariables } from '../../config/env.validation';
import { GamesDeleteOutdatedService } from '../../modules/games/services/games-delete-outdated/games-delete-outdated.service';

@Injectable()
export class DeleteOutdatedGamesCronJob {
  private readonly logger = new Logger(DeleteOutdatedGamesCronJob.name);

  constructor(
    private readonly gamesDeleteOldService: GamesDeleteOutdatedService,
    private readonly configService: ConfigService<EnvironmentVariables, true>,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  onApplicationBootstrap(): void {
    const nodeEnv = this.configService.get('NODE_ENV');
    if (nodeEnv !== 'production') {
      this.logger.log(`Cron Jobs will be stopped. NODE_ENV is ${nodeEnv}`);
      const runBalancersJob = this.schedulerRegistry.getCronJob(
        'runDeleteOldGamesCronJob',
      );

      runBalancersJob && runBalancersJob.stop();
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM, {
    name: 'runDeleteOutdatedGamesCronJob',
  })
  async run() {
    this.logger.log(`Cron Job started`);
    try {
      await this.gamesDeleteOldService.findAndDelete();
      this.logger.log(`Cron Job finished`);
    } catch (error) {
      this.logger.error(`Failed to execute. Error: ${JSON.stringify(error)}`);
    }
  }
}
