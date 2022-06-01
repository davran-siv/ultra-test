import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfigAsync from '../ormconfig-async';
import { AppController } from './app.controller';
import { Modules } from './modules/modules';

@Module({
  imports: [
    Modules,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeormConfigAsync,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
