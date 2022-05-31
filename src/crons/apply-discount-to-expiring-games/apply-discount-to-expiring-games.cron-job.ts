import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { EnvironmentVariables } from '../../config/env.validation';
import { GamesApplyDiscountService } from '../../modules/games/services/games-apply-discount.service';

@Injectable()
export class ApplyDiscountToExpiringGamesCronJob {
  private readonly logger = new Logger(
    ApplyDiscountToExpiringGamesCronJob.name,
  );

  constructor(
    private readonly gamesApplyDiscountService: GamesApplyDiscountService,
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

  async run(): Promise<void> {
    this.logger.log('Cron Job started');
    try {
      await this.gamesApplyDiscountService.addDiscountToExpiringGames();
      this.logger.log('Cron Job finished');
    } catch (error) {
      this.logger.error(`Failed to execute. Error: ${JSON.stringify(error)}`);
    }
  }
}
