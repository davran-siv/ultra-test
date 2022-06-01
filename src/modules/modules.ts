import { Module } from '@nestjs/common';
import { GamesModule } from './games/games.module';
import { PublishersModule } from './publisher/publishers.module';

@Module({
  imports: [GamesModule, PublishersModule],
  exports: [GamesModule, PublishersModule],
})
export class Modules {}
