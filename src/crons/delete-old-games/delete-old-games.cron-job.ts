import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronExpression } from '@nestjs/schedule/dist/enums/cron-expression.enum';
import { EnvironmentVariables } from '../../config/env.validation';
import { GamesDeleteOldService } from '../../modules/games/services/games-delete-old/games-delete-old.service';

@Injectable()
export class DeleteOldGamesCronJob {
  private readonly logger = new Logger(DeleteOldGamesCronJob.name);

  constructor(
    private readonly gamesDeleteOldService: GamesDeleteOldService,
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

  @Cron(CronExpression.EVERY_DAY_AT_1AM, { name: 'runDeleteOldGamesCronJob' })
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
