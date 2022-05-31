import { Module } from '@nestjs/common';
import { GamesRepository } from './games.repository';
import { GamesMutationService } from './services/games-mutation.service';
import { GamesQueryService } from './services/games-query.service';

@Module({
  providers: [GamesMutationService, GamesQueryService, GamesRepository],
  exports: [GamesMutationService, GamesQueryService],
})
export class GamesModule {}
