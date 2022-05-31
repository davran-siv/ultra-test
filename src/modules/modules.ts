import { Module } from '@nestjs/common';
import { GamesModule } from './games/games.module';
import { PublisherModule } from './publisher/publisher.module';

@Module({
  imports: [GamesModule, PublisherModule],
  exports: [GamesModule, PublisherModule],
})
export class Modules {}
