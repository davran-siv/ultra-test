import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DeleteOldGamesCronJob } from './delete-old-games/delete-old-games.cron-job';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [DeleteOldGamesCronJob],
})
export class CronJobsModule {}
