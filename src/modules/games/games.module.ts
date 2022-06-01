import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesEntity } from './games.entity';
import { GamesRepository } from './games.repository';
import { GamesMutationService } from './services/games-mutation/games-mutation.service';
import { GamesQueryService } from './services/games-query/games-query.service';

@Module({
  imports: [TypeOrmModule.forFeature([GamesEntity])],
  providers: [GamesMutationService, GamesQueryService, GamesRepository],
  exports: [GamesMutationService, GamesQueryService],
})
export class GamesModule {}
