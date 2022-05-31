import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ApplyDiscountToExpiringGamesCronJob } from './apply-discount-to-expiring-games/apply-discount-to-expiring-games.cron-job';
import { DeleteOldGamesCronJob } from './delete-old-games/delete-old-games.cron-job';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [DeleteOldGamesCronJob, ApplyDiscountToExpiringGamesCronJob],
})
export class CronJobsModule {}
