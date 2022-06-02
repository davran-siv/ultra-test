import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { GamesModule } from '../modules/games/games.module';
import { ApplyDiscountToExpiringGamesCronJob } from './apply-discount-to-expiring-games/apply-discount-to-expiring-games.cron-job';
import { DeleteOutdatedGamesCronJob } from './delete-outdated-games/delete-outdated-games.cron-job';

@Module({
  imports: [ScheduleModule.forRoot(), GamesModule],
  providers: [DeleteOutdatedGamesCronJob, ApplyDiscountToExpiringGamesCronJob],
})
export class CronJobsModule {}
