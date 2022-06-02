import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import typeormConfigAsync from '../ormconfig-async';
import { AppController } from './app.controller';
import { validate } from './config/env.validation';
import { CronJobsModule } from './crons/cron-jobs.module';
import { Modules } from './modules/modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      validate,
    }),
    Modules,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeormConfigAsync,
    }),
    CronJobsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
